module.exports = {


  friendlyName: 'UserDelete',


  description: 'Delete User.',


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

    await User.destroy({
      id: id
    });
  }
};
