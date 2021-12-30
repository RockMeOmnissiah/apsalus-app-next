module.exports = {


  friendlyName: 'ProductCreate',


  description: 'Create Product.',


  inputs: {

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

    categories: {
      type: 'json'
    },

    image_urls: {
      type: 'string',
      required: false,
      maxLength: 512,
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

    success: {
      description: 'New product was created successfully.'
    },

  },


  fn: async function ({title, description, image_urls, categories, isPhysical, price,
    shippingWeightLBs, stockOnHand}) {

    let newProduct = await Product.create(_.extend({
      title: title,
      description: description,
      image_urls: image_urls,
      isPhysical: isPhysical,
      price: price,
      shippingWeightLBs: shippingWeightLBs,
      stockOnHand: stockOnHand,
    })).fetch();

    if(!newProduct) { throw 'dbUpdateError'; }

    if (categories && categories.length > 0) {
      await Product.addToCollection(newProduct.id, 'categories', categories);
    }

    return newProduct;
  }
};
