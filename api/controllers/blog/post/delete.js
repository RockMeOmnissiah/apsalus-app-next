module.exports = {


  friendlyName: 'PostDelete',


  description: 'Delete Post.',


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

    let post = await BlogPost.findOne({
      id: id
    })
    .populate('comments');

    if (!post) { throw { redirect: '/blog/posts' }; }

    // delete comments first!!!
    for(let i = 0; i < post.comments.length; i++) {

      await BlogComment.destroy({
        id: post.comments[i].id
      });
    }

    await BlogPost.destroy({
      id: id
    });
  }
};
