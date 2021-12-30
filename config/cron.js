const { exec } = require("child_process");

module.exports.runTerminalCmd = function(cmd) {
  return function() {
    exec(cmd,
      (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
}

// schedule: 'seconds minutes hours dayOfMonth month dayOfWeek'
module.exports.cron = {

  // _test: {
  //   schedule: '*/5 * * * * *',
  //   onTick: require('../scripts/_test').fn
  // },

  emailBlastSender: {
    schedule: '0 */15 * * * *',
    // schedule: '*/10 * * * * *',
    onTick: require('../scripts/email-blast-sender').fn
  },

  imageCleanup: {
    schedule: '0 30 2 * * *',
    // schedule: '*/10 * * * * *',
    onTick: require('../scripts/image-cleanup').fn
  },

  // mongoLocalBackup: {
  //   schedule: '0 0 3 * * *',
  //   // schedule: '*/10 * * * * *',
  //   onTick: require('../scripts/mongo-backup').fn
  // },

  // runScraper: {
  //   schedule: '*/30 * * * * *',
  //   onTick: module.exports.runTerminalCmd("cd ../apsalus-scraper; node main.js --job='testJob' --useProxy --headless")
  // }

};
