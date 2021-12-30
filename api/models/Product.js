/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

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

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    categories: {
      collection: 'productCategory',
      via: 'products'
    }
  },

};

