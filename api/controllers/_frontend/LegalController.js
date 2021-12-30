// const isLoggedInPolicy = require('../../guards/is-logged-in');
// const isSuperAdminPolicy = require('../../../guards/is-super-admin');

module.exports = {

  privacy: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

    const { params, query } = sails.helpers.addMeToPageProps(req);
    return sails.config.next.app.render(req, res, '/legal/privacy', { ...params, ...query });
    // });
  },

  terms: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

    const { params, query } = sails.helpers.addMeToPageProps(req);
    return sails.config.next.app.render(req, res, '/legal/terms', { ...params, ...query });
    // });
  },
}
