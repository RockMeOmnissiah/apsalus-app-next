// const lockCron = require('./_lock-cron').fn;

module.exports = {

  friendlyName: 'Test that scripts work.',

  fn: async () => {

    // const JOB_NAME = '_test';

    // if (! (await lockCron({ jobName: JOB_NAME, isLocked: true }))) { return; }

    console.log("Scripts work!");

    // await lockCron({ jobName: JOB_NAME, isLocked: false });

  }
};
