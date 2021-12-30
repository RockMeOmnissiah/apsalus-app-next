module.exports = {


  friendlyName: 'UserUpdate',


  description: 'Update User.',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

    fullName: {
      type: 'string',
      required: true
    },

    emailAddress: {
      type: 'string',
      required: true
    },

    isEmailSubscribed: {
      type: 'boolean',
      required: true
    },

    isSuperAdmin: {
      type: 'boolean',
      required: true
    }

  },

  exits: {

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function ({id, fullName, emailAddress, isEmailSubscribed, isSuperAdmin}) {

    let user = await User.findOne({
      id: id
    });

    var newEmailAddress = emailAddress;
    if (newEmailAddress !== undefined) {
      newEmailAddress = newEmailAddress.toLowerCase();
    }

    // Determine if this request wants to change the current user's email address,
    // revert her pending email address change, modify her pending email address
    // change, or if the email address won't be affected at all.
    var desiredEmailEffect;// ('change-immediately', 'begin-change', 'cancel-pending-change', 'modify-pending-change', or '')
    if (
      newEmailAddress === undefined ||
      (user.emailStatus !== 'change-requested' && newEmailAddress === user.emailAddress) ||
      (user.emailStatus === 'change-requested' && newEmailAddress === user.emailChangeCandidate)
    ) {
      desiredEmailEffect = '';
    } else if (user.emailStatus === 'change-requested' && newEmailAddress === user.emailAddress) {
      desiredEmailEffect = 'cancel-pending-change';
    } else if (user.emailStatus === 'change-requested' && newEmailAddress !== user.emailAddress) {
      desiredEmailEffect = 'modify-pending-change';
    } else if (!sails.config.custom.verifyEmailAddresses || user.emailStatus === 'unconfirmed') {
      desiredEmailEffect = 'change-immediately';
    } else {
      desiredEmailEffect = 'begin-change';
    }


    // If the email address is changing, make sure it is not already being used.
    if (_.contains(['begin-change', 'change-immediately', 'modify-pending-change'], desiredEmailEffect)) {
      let conflictingUser = await User.findOne({
        or: [
          { emailAddress: newEmailAddress },
          { emailChangeCandidate: newEmailAddress }
        ]
      });
      if (conflictingUser) {
        throw 'emailAlreadyInUse';
      }
    }


    // Start building the values to set in the db.
    // (We always set the fullName if provided.)
    var valuesToSet = {
      fullName: fullName,
      isEmailSubscribed: isEmailSubscribed,
      isSuperAdmin: isSuperAdmin,
    };

    switch (desiredEmailEffect) {

      // Change now
      case 'change-immediately':
        _.extend(valuesToSet, {
          emailAddress: newEmailAddress,
          emailChangeCandidate: '',
          emailProofToken: '',
          emailProofTokenExpiresAt: 0,
          emailStatus: user.emailStatus === 'unconfirmed' ? 'unconfirmed' : 'confirmed'
        });
        break;

      // Begin new email change, or modify a pending email change
      case 'begin-change':
      case 'modify-pending-change':
        _.extend(valuesToSet, {
          emailChangeCandidate: newEmailAddress,
          emailProofToken: await sails.helpers.strings.random('url-friendly'),
          emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
          emailStatus: 'change-requested'
        });
        break;

      // Cancel pending email change
      case 'cancel-pending-change':
        _.extend(valuesToSet, {
          emailChangeCandidate: '',
          emailProofToken: '',
          emailProofTokenExpiresAt: 0,
          emailStatus: 'confirmed'
        });
        break;

      // Otherwise, do nothing re: email
    }

    // Save to the db
    await User.updateOne({id: user.id })
    .set(valuesToSet);

    // If an email address change was requested, and re-confirmation is required,
    // send the "confirm account" email.
    if (desiredEmailEffect === 'begin-change' || desiredEmailEffect === 'modify-pending-change') {
      await sails.helpers.sendTemplateEmail.with({
        to: newEmailAddress,
        subject: 'Your account has been updated',
        template: 'email-verify-new-email',
        templateData: {
          fullName: fullName||user.fullName,
          token: valuesToSet.emailProofToken
        }
      });
    }
  }
};
