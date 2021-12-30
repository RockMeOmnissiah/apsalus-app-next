module.exports = {

  Guard_API: async function (req, res, proceed) {

    if (!req.me) {
      const errorQuery = ('?referer=' + req.path);
      return res.redirect('/401' + errorQuery);
    }
    return (await proceed(req, res));
  },

  Guard_ReactPage: async function (me, router) {

    if (!me) {
      const errorQuery = ('?referer=' + router.asPath);
      router.push('/401' + errorQuery);
      return false;
    } // must be logged in
    return true;
  }
};
