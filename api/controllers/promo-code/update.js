module.exports = {


  friendlyName: 'PromoCodeUpdate',


  description: 'Update PromoCode.',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

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
  },


  fn: async function ({id, code, discount_percent}) {

    let updatePromoCode = await PromoCode.updateOne({
      id: id
    })
    .set(_.extend({
      code: code,
      discount_percent: discount_percent,
    }));

    if(!updatePromoCode) { throw 'dbUpdateError'; }

    return updatePromoCode;
  }
};
