module.exports = {


  friendlyName: 'OrderDelete',


  description: 'Delete Order.',


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

    await Order.destroy({
      id: id
    });
  }
};
