module.exports = {


  friendlyName: 'PostCreate',


  description: 'Create Post.',


  inputs: {

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


  fn: async function ({title, content, categories}) {

    let newPost = await BlogPost.create(_.extend({
      title: title,
      content: content,
      user: this.req.me.id
    })).fetch();

    if(!newPost) { throw 'dbUpdateError'; }

    if (categories && categories.length > 0) {
      await BlogPost.addToCollection(newPost.id, 'categories', categories);
    }

    return newPost;
  }
};
