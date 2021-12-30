module.exports = {


  friendlyName: 'PromoCodeGet',


  description: 'Get Promo Codes.',


  inputs: {

    // id: {
    //   type: 'string',
    //   required: true
    // },

  },

  exits: {

    // dbUpdateError: {
    //   description: `There was an issue updating the database.`,
    //   responseType: 'unauthorized'
    // }

  },


  fn: async function () {

    let promos = await PromoCode.find({});

    if (!promos) { throw 'Entities Not Found'; }
    return promos;
  }
};
