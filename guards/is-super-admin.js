module.exports = {

  Guard_API: async function (req, res, proceed) {

    if (!req.me) {
      const errorQuery = ('?referer=' + req.path);
      return res.redirect('/401' + errorQuery);
    }
    if (!req.me.isSuperAdmin) {
      return res.redirect('/403');
    }
    return (await proceed(req, res));
  },

  Guard_ReactPage: async function (me, router) {

    if (!me) {
      const errorQuery = ('?referer=' + router.asPath);
      router.push('/401' + errorQuery);
      return false;
    } // must be logged in
    if (!me.isSuperAdmin) { router.push('/403'); return false; }
    return true;
  }
};
