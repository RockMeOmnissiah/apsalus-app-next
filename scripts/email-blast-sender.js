const lockCron = require('./_lock-cron').fn;

module.exports = {

  friendlyName: 'Send any scheduled email blasts that need to go out.',

  collectEmailBlasts: async () => {

    let emBlasts = await EmailBlast.find({
      select: ['title', 'content', 'slug', 'id', 'scheduledFor'],
      where: { 'scheduledFor': { '!=' : '0' } }
    });
    return emBlasts
  },

  collectEmailSubscribedUsers: async () => {

    let emUsers = await User.find({
      select: ['emailAddress', 'id', 'isEmailSubscribed'],
      where: { 'isEmailSubscribed': true }
    });
    return emUsers
  },

  fn: async () => {

    const fs = require('fs');

    const JOB_NAME = 'email-blast-sender';
    const workDir = './views/emails';
    const templateAppend = 'email-TEMP-';

    if (! (await lockCron({ jobName: JOB_NAME, isLocked: true }))) { return; }

    let emBlasts = await module.exports.collectEmailBlasts();
    console.log(emBlasts.length, 'scheduled email blasts found.');
    if (emBlasts.length == 0) {
      await lockCron({ jobName: JOB_NAME, isLocked: false });
      return;
    }

    let emUsers = await module.exports.collectEmailSubscribedUsers();
    console.log(emUsers.length, 'users subscribed to emails found.');
    if (emUsers.length == 0) {
      await lockCron({ jobName: JOB_NAME, isLocked: false });
      return;
    }

    for (let i = 0; i < emBlasts.length; i++) {

      console.log('\nProcessing: ', emBlasts[i].title);
      if (emBlasts[i].scheduledFor == '0') { continue; }

      if (emBlasts[i].scheduledFor <= Date.now()) {

        // markdown render to html
        let MarkdownIt = require('markdown-it'),
        md = new MarkdownIt();
        emBlasts[i].content = md.render(emBlasts[i].content);
        // update local file template
        let templateFilename = workDir + '/' + templateAppend + emBlasts[i].slug + '.ejs';
        console.log('Creating:', templateFilename);
        fs.writeFileSync(templateFilename, emBlasts[i].content);

        // walk users subscribed to emails and send
        for (let u = 0; u < emUsers.length; u++) {

          console.log('Sending to:', emUsers[u].emailAddress);
          await sails.helpers.sendTemplateEmail.with({
            to: emUsers[u].emailAddress,
            subject: emBlasts[i].title,
            template: templateAppend + emBlasts[i].slug,
            templateData: {
              user: emUsers[u]
            }
          });
        }

        // delete local file
        console.log('Deleting:', templateFilename);
        let tempFile = fs.openSync(templateFilename, 'r');
        fs.closeSync(tempFile);
        fs.unlinkSync(templateFilename);

      } else {
        console.log('Ignoring >> Future Date/Time');
      }

      // update EmailBlast as sent (wipe the scheduledFor field)
      let updateEmailBlast = await EmailBlast.updateOne({
        id: emBlasts[i].id
      })
      .set(_.extend({
        scheduledFor: '0'
      }));

      if(!updateEmailBlast) {
        await lockCron({ jobName: JOB_NAME, isLocked: false });
        throw 'dbUpdateError';
      }
    }

    // delete any remaining temp files (from a previous failed process, etc)
    console.log('Cleaning up remaining temp files...');
    const files = fs.readdirSync(workDir)
    for (const file of files) {
      if (file.startsWith(templateAppend)) {
        console.log('Deleting:', file);
        let tempFile = fs.openSync(file, 'r');
        fs.closeSync(tempFile);
        fs.unlinkSync(file);
      }
    }

    lockCron({ jobName: JOB_NAME, isLocked: false });
  }
};
