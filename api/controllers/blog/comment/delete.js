module.exports = {


  friendlyName: 'CommentDelete',


  description: 'Delete Comment.',


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

    await BlogComment.destroy({
      id: id
    });
  }
};
