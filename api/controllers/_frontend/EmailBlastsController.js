// const isLoggedInPolicy = require('../../../guards/is-logged-in');
const isSuperAdminPolicy = require('../../../guards/is-super-admin');

module.exports = {

  overview: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      query.emBlasts = await EmailBlast.find({
        select: ['title', 'slug', 'id', 'createdAt', 'scheduledFor']
      })
      .populate('user')
      .sort('createdAt DESC');

      query.emBlasts.forEach((em)=>{
        sails.helpers.redactUser(em.user);
      });

      return sails.config.next.app.render(req, res, '/email-blasts/overview', { ...params, ...query });
    });
  },

  view_by_slug: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let emSlug = req.param('slug', undefined);
      if (!emSlug) { throw 'idError'; }

      query.emBlast = await EmailBlast.findOne({
        slug: emSlug
      })
      .populate('user');

      if (!query.emBlast) { return res.redirect('/email-blasts'); }

      sails.helpers.redactUser(query.emBlast.user);

      // markdown render to html
      let MarkdownIt = require('markdown-it'),
      md = new MarkdownIt();
      query.emBlast.content = md.render(query.emBlast.content);

      return sails.config.next.app.render(req, res, '/email-blasts/view_by_slug', { ...params, ...query });
    });
  },

  create: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);
      return sails.config.next.app.render(req, res, '/email-blasts/create', { ...params, ...query });
    });
  },

  update: async (req, res) => {

    await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

      const { params, query } = sails.helpers.addMeToPageProps(req);

      let emId = req.param('id', undefined);
      if (!emId) { throw 'idError'; }

      query.emData = await EmailBlast.findOne({
        id: emId
      });

      if (!query.emData) { return res.redirect('/email-blasts'); }

      return sails.config.next.app.render(req, res, '/email-blasts/update', { ...params, ...query });
    });
  },
}
