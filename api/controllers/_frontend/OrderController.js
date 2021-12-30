// const isLoggedInPolicy = require('../../../guards/is-logged-in');
const isSuperAdminPolicy = require('../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.orders = await Order.find({})
      .populate('user')
      .sort('createdAt DESC');

      if (!query.orders) { query.orders = []; }

      return sails.config.next.app.render(req, res, '/orders/overview', { ...params, ...query });
    });
  },

  create: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);
      return sails.config.next.app.render(req, res, '/orders/create', { ...params, ...query });
    });
  },

  update: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let orderId = req.param('id', undefined);
      if (!orderId) { throw 'idError'; }

      query.orderData = await Order.findOne({
        id: orderId
      })
      .populate('user');

      if (!query.orderData) { return res.redirect('/orders'); }

      return sails.config.next.app.render(req, res, '/orders/update', { ...params, ...query });
    });
  },
}
