const isLoggedInPolicy = require('../../../guards/is-logged-in');
// const isSuperAdminPolicy = require('../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    await isLoggedInPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);
      return sails.config.next.app.render(req, res, '/account/overview', { ...params, ...query });
    });
  },

  password_edit: async (req, res) => {

    await isLoggedInPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);
      return sails.config.next.app.render(req, res, '/account/password_edit', { ...params, ...query });
    });
  },

  profile_edit: async (req, res) => {

    await isLoggedInPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);
      return sails.config.next.app.render(req, res, '/account/profile_edit', { ...params, ...query });
    });
  },

  orders: async (req, res) => {

    await isLoggedInPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.orders = await Order.find({
        user: req.me.id
      })
      .sort('createdAt DESC');

      if (!query.orders) { query.orders = []; }

      return sails.config.next.app.render(req, res, '/account/orders', { ...params, ...query });
    });
  },

}
