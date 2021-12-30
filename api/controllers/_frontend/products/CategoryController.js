// const isLoggedInPolicy = require('../../../../guards/is-logged-in');
const isSuperAdminPolicy = require('../../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.categories = await ProductCategory.find({});
      // .populate('posts');

      return sails.config.next.app.render(req, res, '/products/categories/overview', { ...params, ...query });
    // });
  },

  create: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await ProductCategory.find({}));

      return sails.config.next.app.render(req, res, '/products/categories/create', { ...params, ...query });
    });
  },

  update: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let catId = req.param('id', undefined);
      if (!catId) { throw 'idError'; }

      query.catData = await ProductCategory.findOne({
        id: catId
      });

      if (!query.catData) { return res.redirect('/products/categories'); }

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await ProductCategory.find({}));

      return sails.config.next.app.render(req, res, '/products/categories/update', { ...params, ...query });
    });
  },
}
