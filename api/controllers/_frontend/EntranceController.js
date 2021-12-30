// const isLoggedInPolicy = require('../../guards/is-logged-in');
// const isSuperAdminPolicy = require('../../../guards/is-super-admin');

module.exports = {

  signup: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{
    if (req.me) { return res.redirect('/'); }

    const { params, query } = sails.helpers.addMeToPageProps(req);
    return sails.config.next.app.render(req, res, '/entrance/signup', { ...params, ...query });
    // });
  },

  email_confirm: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

    const { params, query } = sails.helpers.addMeToPageProps(req);
    return sails.config.next.app.render(req, res, '/entrance/email_confirm', { ...params, ...query });
    // });
  },

  login: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{
    if (req.me) { return res.redirect('/'); }

    const { params, query } = sails.helpers.addMeToPageProps(req);
    return sails.config.next.app.render(req, res, '/entrance/login', { ...params, ...query });
    // });
  },

  password_forgot: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{
    if (req.me) { return res.redirect('/'); }

    const { params, query } = sails.helpers.addMeToPageProps(req);
    return sails.config.next.app.render(req, res, '/entrance/password_forgot', { ...params, ...query });
    // });
  },

  password_new: async (req, res) => {

    // await isSuperAdminPolicy.Guard_API(req, res, async (req, res)=>{

    const { params, query } = sails.helpers.addMeToPageProps(req);

    // If password reset token is missing, display an error page explaining that the link is bad.
    if (!query.token) {
      sails.log.warn('Attempting to view new password (recovery) page, but no reset password token included in request!  Displaying error page...');
      return res.redirect('/password/forgot');
    }//•

    // Look up the user with this reset token.
    var userRecord = await User.findOne({ passwordResetToken: query.token });
    // If no such user exists, or their token is expired, display an error page explaining that the link is bad.
    if (!userRecord || userRecord.passwordResetTokenExpiresAt <= Date.now()) {
      return res.redirect('/password/forgot');
    }

    return sails.config.next.app.render(req, res, '/entrance/password_new', { ...params, ...query });
    // });
  }
}
