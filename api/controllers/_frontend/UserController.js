// const isLoggedInPolicy = require('../../../guards/is-logged-in');
const isSuperAdminPolicy = require('../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.users = await User.find({})
      .sort('createdAt DESC');
      // .populate('posts');

      return sails.config.next.app.render(req, res, '/users/overview', { ...params, ...query });
    });
  },

  create: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);
      return sails.config.next.app.render(req, res, '/users/create', { ...params, ...query });
    });
  },

  update: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let userId = req.param('id', undefined);
      if (!userId) { throw 'idError'; }

      query.userData = await User.findOne({
        id: userId
      });
      // .populate('posts');

      if (!query.userData) { return res.redirect('/users'); }

      return sails.config.next.app.render(req, res, '/users/update', { ...params, ...query });
    });
  },
}
