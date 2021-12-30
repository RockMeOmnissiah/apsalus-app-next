module.exports = {


  friendlyName: 'ProductUpdate',


  description: 'Update Product.',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200,
    },

    description: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200,
    },

    image_urls: {
      type: 'string',
      required: false,
      maxLength: 512,
    },

    categories: {
      type: 'json'
    },

    isPhysical: {
      type: 'boolean',
      defaultsTo: true,
      description: 'Is a physical product that we need to ship?'
    },

    price: {
      type: 'number',
      example: 4.99
    },

    shippingWeightLBs: {
      type: 'number',
      example: 0.1
    },

    stockOnHand: {
      type: 'number',
      example: 5
    },

  },

  exits: {
  },


  fn: async function ({id, title, description, categories, image_urls, isPhysical, price,
    shippingWeightLBs, stockOnHand}) {

    let updateProduct = await Product.updateOne({
      id: id
    })
    .set(_.extend({
      title: title,
      description: description,
      image_urls: image_urls,
      isPhysical: isPhysical,
      price: price,
      shippingWeightLBs: shippingWeightLBs,
      stockOnHand: stockOnHand,
    }));

    if(!updateProduct) { throw 'dbUpdateError'; }

    if (categories) {
      await Product.replaceCollection(updateProduct.id, 'categories', categories);
    }

    return updateProduct;
  }
};
