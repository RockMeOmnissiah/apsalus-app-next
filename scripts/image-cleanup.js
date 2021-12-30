const lockCron = require('./_lock-cron').fn;

const image_path = "/api/images/download/";

module.exports = {

  friendlyName: 'Cleanup unused images.',

  collectUsedImagesFromPosts: async () => {

    let usedImages = [];

    let posts = await BlogPost.find({});
    for (let i = 0; i < posts.length; i++) {

      posts[i].content.replace(/(!\[.*?\]\()(.+?)(\))/g, function(whole, a, b, c) {
        // console.log(whole);
        // console.log(a);
        let fileName = b.split(image_path)[1];
        // console.log('FOUND:', fileName);
        // console.log(c);
        usedImages.push(fileName);
      });
    }
    return usedImages;
  },

  collectUsedImagesFromProducts: async () => {

    let usedImages = [];

    let products = await Product.find({});
    for (let i = 0; i < products.length; i++) {

      products[i].image_urls = products[i].image_urls.split(',');

      if (products[i].image_urls.length > 0) {
        products[i].image_urls.forEach(url => {
          let fileName = url.split(image_path)[1];
          if (fileName) { usedImages.push(fileName); }
        });
      }
    }
    return usedImages;
  },

  fn: async () => {

    const JOB_NAME = 'image-cleanup';

    if (! (await lockCron({ jobName: JOB_NAME, isLocked: true }))) { return; }

    let postImages = await module.exports.collectUsedImagesFromPosts();
    // console.log('POST IMAGES:', postImages);

    let productImages = await module.exports.collectUsedImagesFromProducts();
    // console.log('PRODUCT IMAGES:', productImages);

    let dbClient = sails.getDatastore().manager.client;
    let fsDB = await dbClient.db('fs');

    let deleteList = [];
    let fsFiles = await fsDB.collection('fs.files').find({}).toArray();
    // console.log('FILES:', fsFiles);
    for (let i = 0; i < fsFiles.length; i++) {

      console.log('Checking', fsFiles[i]._id,'...');

      // file not currently used in a blog post image?
      if (postImages.indexOf(fsFiles[i]._id) == -1) {

        // file not currently used in a product image?
        if (productImages.indexOf(fsFiles[i]._id) == -1) {

          deleteList.push(fsFiles[i]._id);
          console.log('CACHE FOR DELETION');

        } else { console.log('OK - Product Image'); }

      } else { console.log('OK - Blog Post Image'); }
    }

    deleteList.forEach( async (id) => {
      console.log('DELETING', id);
      // delete all related file chunks
      // let fsChunks =
      await fsDB.collection('fs.chunks').deleteOne({
        files_id: id
      });
      // delete file metadata
      await fsDB.collection('fs.files').deleteOne({
        _id: id
      });
    });

    await lockCron({ jobName: JOB_NAME, isLocked: false });
  }
};
