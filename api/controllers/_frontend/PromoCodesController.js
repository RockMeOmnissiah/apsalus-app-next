// const isLoggedInPolicy = require('../../../guards/is-logged-in');
const isSuperAdminPolicy = require('../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.promoCodes = await PromoCode.find({})
      .sort('createdAt DESC');

      if (!query.promoCodes) { query.promoCodes = []; }

      return sails.config.next.app.render(req, res, '/promo-codes/overview', { ...params, ...query });
    });
  },

  create: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);
      return sails.config.next.app.render(req, res, '/promo-codes/create', { ...params, ...query });
    });
  },

  update: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let orderId = req.param('id', undefined);
      if (!orderId) { throw 'idError'; }

      query.promoData = await PromoCode.findOne({
        id: orderId
      });

      if (!query.promoData) { return res.redirect('/promo-codes'); }

      return sails.config.next.app.render(req, res, '/promo-codes/update', { ...params, ...query });
    });
  },
}
