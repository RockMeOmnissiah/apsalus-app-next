// const isLoggedInPolicy = require('../../guards/is-logged-in');
// const isSuperAdminPolicy = require('../../../guards/is-super-admin');

module.exports = {

  index: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

    const { params, query } = sails.helpers.addMeToPageProps(req);

    query.categoryOptions = [{id: '', title: 'N/A'}].concat(await ProductCategory.find({}));

    return sails.config.next.app.render(req, res, '/', { ...params, ...query });
    // });
  },

  about: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

    const { params, query } = sails.helpers.addMeToPageProps(req);
    return sails.config.next.app.render(req, res, '/about', { ...params, ...query });
    // });
  },

  contact: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

    const { params, query } = sails.helpers.addMeToPageProps(req);
    return sails.config.next.app.render(req, res, '/contact', { ...params, ...query });
    // });
  },

  faq: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

    const { params, query } = sails.helpers.addMeToPageProps(req);
    return sails.config.next.app.render(req, res, '/faq', { ...params, ...query });
    // });
  },
}
