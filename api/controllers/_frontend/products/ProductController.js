// const isLoggedInPolicy = require('../../../../guards/is-logged-in');
const isSuperAdminPolicy = require('../../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.products = await Product.find({})
      .populate('categories')
      .sort('createdAt DESC');

      if (!query.products) { query.products = []; }

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await ProductCategory.find({}));

      return sails.config.next.app.render(req, res, '/products/overview', { ...params, ...query });
    });
  },

  create: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await ProductCategory.find({}));

      return sails.config.next.app.render(req, res, '/products/create', { ...params, ...query });
    });
  },

  update: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let productId = req.param('id', undefined);
      if (!productId) { throw 'idError'; }

      query.productData = await Product.findOne({
        id: productId
      })
      .populate('categories');

      if (!query.productData) { return res.redirect('/products'); }

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await ProductCategory.find({}));

      return sails.config.next.app.render(req, res, '/products/update', { ...params, ...query });
    });
  },

  recent: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.products = await Product.find({})
      .populate('categories')
      .sort('createdAt DESC')
      .limit(10);

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await ProductCategory.find({}));

      return sails.config.next.app.render(req, res, '/products/recent', { ...params, ...query });
    // });
  },

  view_by_cat: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let catSlug = req.param('slug', undefined);
      if (!catSlug) { throw 'idError'; }

      query.cat = await ProductCategory.findOne({
        slug: catSlug
      })
      .populate('products');

      query.cat.products.forEach(async (p)=>{
        let productData = await Product.findOne({
          id: p.id
        })
        .populate('categories');
        p.categories = productData.categories;
      });

      query.categoryOptions = [{id: '', title: 'N/A'}].concat(await ProductCategory.find({}));

      return sails.config.next.app.render(req, res, '/products/view_by_cat', { ...params, ...query });
    // });
  },

}
