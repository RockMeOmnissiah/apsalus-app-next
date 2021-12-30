module.exports = {


  friendlyName: 'Image Upload',


  description: 'Upload an image for the MDE editor, etc.',


  exits: {

    success: {
      description: 'Image uploaded.'
    },

    badEvent: {
      description: `There was a problem with the file upload.`,
      responseType: 'unauthorized'
    },

  },


  fn: async function () {

    let retObject = undefined;

    async function awaitUpload() {
      while(!retObject) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    let uploadData;
    if (this.req.file('image')) {
      uploadData = this.req.file('image');
    } else if (this.req.param('image')) {
      uploadData = this.req.param('image');
    }
    if (!uploadData) { throw 'badEvent'; }

    uploadData.upload(
      require('@dmedina2015/skipper-gridfs')({
        uri: sails.config.custom.gridfs_url
      }).receive(), (err, uploadedFiles)=>{

        if (err) { console.log(err); retObject = true; }
        else {
          retObject = {
            'data': { 'filePath': 'api/images/download/' + encodeURI(uploadedFiles[0].fd) }
          };
        }

    });

    await awaitUpload();
    if (retObject === true) { throw 'badEvent'; }
    return retObject;

  }

};
