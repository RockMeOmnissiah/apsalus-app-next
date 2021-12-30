module.exports = {


  friendlyName: 'PromoCodeDelete',


  description: 'Delete PromoCode.',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

  },

  exits: {

    // dbUpdateError: {
    //   description: `There was an issue updating the database.`,
    //   responseType: 'unauthorized'
    // }

  },


  fn: async function ({id}) {

    await PromoCode.destroy({
      id: id
    });
  }
};
