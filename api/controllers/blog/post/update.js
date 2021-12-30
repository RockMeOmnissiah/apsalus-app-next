module.exports = {


  friendlyName: 'PostUpdate',


  description: 'Update Post.',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200
    },

    content: {
      type: 'string',
      required: true
    },

    categories: {
      type: 'json'
    },

  },

  exits: {

    dbUpdateError: {
      description: `There was an issue updating the database.`,
      responseType: 'unauthorized'
    }

  },


  fn: async function ({id, title, content, categories}) {

    let updatePost = await BlogPost.updateOne({
      id: id
    })
    .set(_.extend({
      title: title,
      content: content
    }));

    if(!updatePost) { throw 'dbUpdateError'; }

    if (categories) {
      await BlogPost.replaceCollection(updatePost.id, 'categories', categories);
    }

    return updatePost;
  }
};
