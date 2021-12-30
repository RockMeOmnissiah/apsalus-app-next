module.exports = {


  friendlyName: 'CategoryDelete',


  description: 'Delete Category.',


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

    await BlogCategory.destroy({
      id: id
    });
  }
};
