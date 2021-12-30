module.exports = {


  friendlyName: 'Image Download',


  description: 'Download an image for the MDE editor, etc.',


  exits: {

    success: {
      description: 'Image downloaded.'
    },

    badEvent: {
      description: `There was a problem with the file download.`,
      responseType: 'notFound'
    },

  },


  fn: async function () {

    let retObject = undefined;
    let fd = decodeURI(this.req.param('fd'));

    async function awaitDownload() {
      while(!retObject) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    require('@dmedina2015/skipper-gridfs')({
      uri: sails.config.custom.gridfs_url
    }).read(
      fd, function(err, file) {

      if (err) { console.log(err); retObject = true; }
      else { retObject = file; }
    });

    await awaitDownload();
    if (retObject === true) { throw 'badEvent'; }

    // console.log(retObject);
    this.res.set('Content-Type', 'image/' + fd.split('.')[1]);
    return retObject;

  }

};
