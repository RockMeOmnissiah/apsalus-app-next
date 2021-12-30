module.exports = {


  friendlyName: 'EmailBlastDelete',


  description: 'Delete Email Blast.',


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

    let emBlast = await EmailBlast.findOne({
      id: id
    });

    if (!emBlast) { throw { redirect: '/email-blasts' }; }

    await EmailBlast.destroy({
      id: id
    });
  }
};
