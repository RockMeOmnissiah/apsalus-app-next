module.exports = {


  friendlyName: 'PromoCodeCreate',


  description: 'Create Promo Code.',


  inputs: {

    code: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 64,
    },

    discount_percent: {
      type: 'number',
      required: true,
    },

  },

  exits: {

    success: {
      description: 'New promo code was created successfully.'
    },

  },


  fn: async function ({code, discount_percent}) {

    let newPromo = await PromoCode.create(_.extend({
      code: code,
      discount_percent: discount_percent,
    })).fetch();

    if(!newPromo) { throw 'dbUpdateError'; }

    return newPromo;
  }
};
