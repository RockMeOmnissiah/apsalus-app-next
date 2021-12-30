// const isLoggedInPolicy = require('../../../guards/is-logged-in');
const isSuperAdminPolicy = require('../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let dbClient = sails.getDatastore().manager.client;
      let fsDB = await dbClient.db('fs');
      query.images = await fsDB.collection('fs.files').find({}).toArray();;

      if (!query.images) { query.images = []; }

      return sails.config.next.app.render(req, res, '/uploaded-images/overview', { ...params, ...query });
    });
  },

}
