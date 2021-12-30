const fs = require('fs');
const _ = require('lodash');
const exec = require('child_process').exec;
const path = require('path');

const dbOptions = {
  autoBackup: true,
  removeOldBackup: true,
  keepLastDaysBackup: 2,
  autoBackupPath: path.join(__dirname.replace('/scripts', ''), '_database-backups/')
};

module.exports = {

  friendlyName: 'Local backup of MongoDB.',

  stringToDate: (dateString) => {
    return new Date(dateString);
  },

  getDirectories: (source) => {
    return fs.readdirSync(source, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
  },

  fn: () => {

    // NOTE *** we do NOT lock cron job in DB here so that EACH app server makes a backup

    // check for auto backup is enabled or disabled
    if (dbOptions.autoBackup == true) {
      let date = new Date();
      let beforeDate, oldBackupDir, oldBackupPath;

      currentDate = module.exports.stringToDate(date);
      let newBackupDir =
        currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() + 1) +
        '-' +
        currentDate.getDate();

      let newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir;

      // command for mongodb dump process
      let cmd =
        'mongodump' +
        ' --uri ' +
        ((sails.config.environment === 'production') ? process.env.sails_datastores__prod__url : process.env.sails_datastores__default__url ) +
        ' --out ' +
        newBackupPath;
      console.log('DB Auto Backup:', cmd);
      exec(cmd, (error, stdout, stderr) => {});

      // check for remove old backup after keeping # of days given in configuration
      if (dbOptions.removeOldBackup == true) {

        beforeDate = _.clone(currentDate);
        // substract number of days to keep backup and remove old backup
        beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup);

        let oldBackupDir =
        beforeDate.getFullYear() +
        '-' +
        (beforeDate.getMonth() + 1) +
        '-' +
        beforeDate.getDate();

        let oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir;

        // check for remove old backup after keeping # of days given in configuration
        if (fs.existsSync(oldBackupPath)) {
          console.log('DB Auto Backup >>> RM OLD:', oldBackupPath);
          exec('rm -rf ' + oldBackupPath, err => {});
        }
      }
    }
  }
};
