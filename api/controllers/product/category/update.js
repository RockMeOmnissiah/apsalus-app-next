module.exports = {


  friendlyName: 'CategoryUpdate',


  description: 'Update Category.',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

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


  fn: async function ({id, title, description, parent}) {

    let updateCat = await ProductCategory.updateOne({
      id: id
    })
    .set(_.extend({
      title: title,
      description: description,
      parent: ((parent == '' || parent == id) ? null : parent),
    }));

    if(!updateCat) { throw 'dbUpdateError'; }

    return updateCat;
  }
};
