module.exports = {

  friendlyName: 'Upsert and lock cron record in db so multiple server instances do not start the same jobs.',

  fn: async ({jobName, isLocked}) => {

    console.log('CRON LOCK:', jobName, isLocked);

    // try to update existing lock data...
    let lockRecord = await CronLock.findOne({
      jobName: jobName
    });

    if (lockRecord) {

      if (lockRecord.isLocked && isLocked) {
        console.log('Job', jobName,'already in process on another server (locked in cron).');
        return false;
      }

      console.log('Updating existing cron lock...');
      lockRecord = await CronLock.updateOne({
        jobName: jobName
      }).set(_.extend({
        isLocked: isLocked
      }));

    } else {
      // ...otherwise, make a new lock
      console.log('Creating new cron lock...');
      lockRecord = await CronLock.create(_.extend({
        jobName: jobName,
        isLocked: isLocked
      })).fetch();
    }
    // failed to either update existing OR create a new one!
    if (!lockRecord) { throw 'dbUpdateError'; }
    return true;
  }
};
