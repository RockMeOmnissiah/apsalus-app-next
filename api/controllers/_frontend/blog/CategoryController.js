// const isLoggedInPolicy = require('../../../../guards/is-logged-in');
const isSuperAdminPolicy = require('../../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.categories = await BlogCategory.find({});
      // .populate('posts');

      return sails.config.next.app.render(req, res, '/blog/categories/overview', { ...params, ...query });
    // });
  },

  create: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await BlogCategory.find({}));

      return sails.config.next.app.render(req, res, '/blog/categories/create', { ...params, ...query });
    });
  },

  update: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let catId = req.param('id', undefined);
      if (!catId) { throw 'idError'; }

      query.catData = await BlogCategory.findOne({
        id: catId
      });
      // .populate('posts');

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await BlogCategory.find({}));

      if (!query.catData) { return res.redirect('/blog/categories'); }

      return sails.config.next.app.render(req, res, '/blog/categories/update', { ...params, ...query });
    });
  },
}
