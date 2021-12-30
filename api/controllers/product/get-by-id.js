module.exports = {


  friendlyName: 'ProductGetByID',


  description: 'Get Product By ID.',


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

    let prod = await Product.findOne({
      id: id
    })
    .populate('categories');

    if (!prod) { throw 'Entity Not Found'; }
    return prod;
  }
};
