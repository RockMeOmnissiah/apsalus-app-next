module.exports = {


  friendlyName: 'Resend verification email',


  description: 'Resend the verification / confirmation email for the logged-in user.',


  inputs: {
  },

  exits: {
    redirect: {
      description: 'Verification email resent...',
      responseType: 'redirect'
    }
  },


  fn: async function () {

    // Update email token and save to the db
    await User.updateOne({id: this.req.me.id })
    .set({
      emailProofToken: await sails.helpers.strings.random('url-friendly'),
      emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL
    });
    this.req.me = await User.findOne({id: this.req.me.id });

    if (sails.config.custom.verifyEmailAddresses) {
      // Send "confirm account" email
      await sails.helpers.sendTemplateEmail.with({
        to: (this.req.me.emailChangeCandidate ? this.req.me.emailChangeCandidate : this.req.me.emailAddress),
        subject: 'Please confirm your account',
        template: 'email-verify-account',
        templateData: {
          fullName: this.req.me.fullName,
          token: this.req.me.emailProofToken
        }
      });

    } else {
      sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
    }

    throw { redirect: '/account' };
  }

};
