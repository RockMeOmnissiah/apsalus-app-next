/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

 module.exports.policies = {

  // **********************************
  // Logged In:
  // **********************************
  '*': 'is-logged-in',
  'security/grant-csrf-token': 'is-logged-in',

  'order/create': 'is-logged-in',

  'shipping-rate/get': 'is-logged-in',
  'tax-rate/get': 'is-logged-in',

  'promo-code/get': 'is-logged-in',

  // **********************************
  // Super Admin:
  // **********************************

  'promo-code/create': 'is-super-admin',
  'promo-code/update': 'is-super-admin',
  'promo-code/delete': 'is-super-admin',

  'product/create': 'is-super-admin',
  'product/update': 'is-super-admin',
  'product/delete': 'is-super-admin',

  'product/category/create': 'is-super-admin',
  'product/category/update': 'is-super-admin',
  'product/category/delete': 'is-super-admin',

  'order/update': 'is-super-admin',
  'order/delete': 'is-super-admin',

  'user/create': 'is-super-admin',
  'user/update': 'is-super-admin',
  'user/delete': 'is-super-admin',

  'blog/post/create': 'is-super-admin',
  'blog/post/update': 'is-super-admin',
  'blog/post/delete': 'is-super-admin',

  'blog/category/create': 'is-super-admin',
  'blog/category/update': 'is-super-admin',
  'blog/category/delete': 'is-super-admin',

  'email-blasts/create': 'is-super-admin',
  'email-blasts/update': 'is-super-admin',
  'email-blasts/delete': 'is-super-admin',

  'images/upload': 'is-super-admin',

  'cron-lock/update': 'is-super-admin',

  // **********************************
  // PUBLIC access:
  // **********************************

  '_frontend/*': true,
  'entrance/*': true,

  'deliver-contact-form-message': true,

  'images/download': true,

  'blog/category/get': true,

  'product/get-by-id': true,

  'product/category/get': true,

};
