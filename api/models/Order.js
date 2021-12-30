/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    external_order_id: {
      type: 'string',
      required: true,
      unique: false,
      maxLength: 128,
      example: 'Paypal Order ID'
    },

    external_payer_id: {
      type: 'string',
      required: false,
      maxLength: 128,
      example: 'Paypal Payer ID'
    },

    emailAddress: {
      type: 'string',
      required: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com'
    },

    fullName: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name.',
      maxLength: 120,
      example: 'Mary Sue van der McHenst'
    },

    country_code: {
      type: 'string',
      required: false,
      maxLength: 12,
    },

    status: {
      type: 'string',
      isIn: ['pending', 'received', 'fulfilled', 'refunded'],
      defaultsTo: 'pending',
    },

    shipToFullName: {
      type: 'string',
      required: false,
      maxLength: 120,
    },

    shipToAddress1: {
      type: 'string',
      required: false,
      maxLength: 120,
    },

    shipToAddress2: {
      type: 'string',
      required: false,
      maxLength: 120,
    },

    shipToCity: {
      type: 'string',
      required: false,
      maxLength: 120,
    },

    shipToState: {
      type: 'string',
      required: false,
      maxLength: 32,
    },

    shipToZip: {
      type: 'string',
      required: false,
      maxLength: 32,
    },

    shipToCountry: {
      type: 'string',
      required: false,
      maxLength: 64,
    },

    shipToEstDate: {
      type: 'string',
      required: false,
      maxLength: 64,
    },

    shippingCarrier: {
      type: 'string',
      isIn: ['usps', 'fedex', 'ups'],
      defaultsTo: 'usps',
    },

    shippingTracking: {
      type: 'string',
      required: false,
      maxLength: 128,
    },

    itemized: {
      type: 'string',
      required: true,
      maxLength: 512,
      example: '1x This, 2x That'
    },

    subtotal: {
      type: 'number',
      example: 4.99
    },

    taxPrice: {
      type: 'number',
      example: 4.99
    },

    shippingPrice: {
      type: 'number',
      example: 4.99
    },

    discountPrice: {
      type: 'number',
      example: -4.99
    },

    totalPrice: {
      type: 'number',
      example: 4.99
    },

    shippingWeightLBs: {
      type: 'number',
      example: 0.1
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user: {
      model: 'user',
      required: true
    },

  },

};

