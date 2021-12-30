module.exports = {


  friendlyName: 'BlogCategoryGet',


  description: 'Get BlogCategories.',


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


  fn: async function ({}) {

    let cats = await BlogCategory.find({
    });

    if (!cats) { throw 'Entities Not Found'; }
    return cats;
  }
};
