module.exports = {


  friendlyName: 'CommentCreate',


  description: 'Create Comment.',


  inputs: {

    content: {
      type: 'string',
      required: true
    },

    post_id: {
      type: 'string',
      required: true
    },

  },

  exits: {

    dbUpdateError: {
      description: `There was an issue updating the database.`,
      responseType: 'unauthorized'
    }

  },


  fn: async function ({content, post_id}) {

    let newCom = await BlogComment.create(_.extend({
      content: content,
      post: post_id,
      user: this.req.me.id
    })).fetch();

    if(!newCom) { throw 'dbUpdateError'; }
    return newCom;
  }
};
