module.exports = {


  friendlyName: 'CategoryCreate',


  description: 'Create Category.',


  inputs: {

    title: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 64
    },

    description: {
      type: 'string',
      required: true,
      maxLength: 200
    },

    parent: {
      type: 'string'
    },

  },

  exits: {

    dbUpdateError: {
      description: `There was an issue updating the database.`,
      responseType: 'unauthorized'
    }

  },


  fn: async function ({title, description, parent}) {

    let newCat = await BlogCategory.create(_.extend({
      title: title,
      description: description,
      parent: ((parent == '') ? null : parent),
    })).fetch();

    if(!newCat) { throw 'dbUpdateError'; }

    return newCat;
  }
};
