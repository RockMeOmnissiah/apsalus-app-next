// const isLoggedInPolicy = require('../../../guards/is-logged-in');
const isSuperAdminPolicy = require('../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.cronLocks = await CronLock.find({})
      .sort('createdAt DESC');

      if (!query.cronLocks) { query.cronLocks = []; }

      return sails.config.next.app.render(req, res, '/cron-locks/overview', { ...params, ...query });
    });
  },

  // create: async (req, res) => {

  //   await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

  //     const { params, query } = sails.helpers.addMeToPageProps(req);
  //     return sails.config.next.app.render(req, res, '/cron-locks/create', { ...params, ...query });
  //   });
  // },

  update: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let cronLockId = req.param('id', undefined);
      if (!cronLockId) { throw 'idError'; }

      query.cronLockData = await CronLock.findOne({
        id: cronLockId
      });

      if (!query.cronLockData) { return res.redirect('/cron-locks'); }

      return sails.config.next.app.render(req, res, '/cron-locks/update', { ...params, ...query });
    });
  },
}
