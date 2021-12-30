module.exports = {


  friendlyName: 'ProductDelete',


  description: 'Delete Product.',


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

    await Product.destroy({
      id: id
    });
  }
};
