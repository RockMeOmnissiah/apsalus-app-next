// const isLoggedInPolicy = require('../../../../guards/is-logged-in');
const isSuperAdminPolicy = require('../../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.posts = await BlogPost.find({
        select: ['title', 'slug', 'id', 'createdAt']
      })
      .populate('user')
      .populate('categories')
      .sort('createdAt DESC');

      query.posts.forEach((p)=>{
        sails.helpers.redactUser(p.user);
      });

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await BlogCategory.find({}));

      return sails.config.next.app.render(req, res, '/blog/posts/overview', { ...params, ...query });
    // });
  },

  create: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await BlogCategory.find({}));

      return sails.config.next.app.render(req, res, '/blog/posts/create', { ...params, ...query });
    });
  },

  update: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let postId = req.param('id', undefined);
      if (!postId) { throw 'idError'; }

      query.postData = await BlogPost.findOne({
        id: postId
      })
      .populate('categories');

      if (!query.postData) { return res.redirect('/blog/posts'); }

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await BlogCategory.find({}));

      return sails.config.next.app.render(req, res, '/blog/posts/update', { ...params, ...query });
    });
  },

  recent: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.posts = await BlogPost.find({
        select: ['title', 'content', 'slug', 'id', 'createdAt']
      })
      .populate('user')
      .populate('comments')
      .populate('categories')
      .sort('createdAt DESC')
      .limit(10);

      let MarkdownIt = require('markdown-it'),
      md = new MarkdownIt();

      query.posts.forEach((p)=>{
        sails.helpers.redactUser(p.user);

        // markdown render to html
        p.content = md.render(p.content);
      });

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await BlogCategory.find({}));

      return sails.config.next.app.render(req, res, '/blog/posts/recent', { ...params, ...query });
    // });
  },

  view_by_cat: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let catSlug = req.param('slug', undefined);
      if (!catSlug) { throw 'idError'; }

      query.cat = await BlogCategory.findOne({
        slug: catSlug
      })
      .populate('posts', {
        select: ['title', 'slug', 'id', 'createdAt']
      });

      return sails.config.next.app.render(req, res, '/blog/posts/view_by_cat', { ...params, ...query });
    // });
  },

  view_by_slug: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let postSlug = req.param('slug', undefined);
      if (!postSlug) { throw 'idError'; }

      query.post = await BlogPost.findOne({
        slug: postSlug
      })
      .populate('user')
      .populate('comments')
      .populate('categories');

      if (!query.post) { return res.redirect('/blog/posts'); }

      sails.helpers.redactUser(query.post.user);

      // markdown render to html
      let MarkdownIt = require('markdown-it'),
      md = new MarkdownIt();
      query.post.content = md.render(query.post.content);

      // populate data for the comments
      let populatedComments = [];
      for(let i = 0; i < query.post.comments.length; i++) {

        let popData = await BlogComment.findOne({
          id: query.post.comments[i].id
        }).populate('user');

        // markdown render to html
        popData.content = md.render(popData.content);

        populatedComments.push(popData);
      }
      query.post.comments = populatedComments;

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await BlogCategory.find({}));

      return sails.config.next.app.render(req, res, '/blog/posts/view_by_slug', { ...params, ...query });
    // });
  },
}
