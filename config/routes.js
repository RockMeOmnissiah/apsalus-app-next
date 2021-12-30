/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  // …
  'GET    /':                                           '_frontend/HomeController.index',
  'GET    /about':                                      '_frontend/HomeController.about',
  'GET    /contact':                                    '_frontend/HomeController.contact',
  'GET    /faq':                                        '_frontend/HomeController.faq',
  'GET    /legal/privacy':                              '_frontend/LegalController.privacy',
  'GET    /legal/terms':                                '_frontend/LegalController.terms',

  'GET    /signup':                                     '_frontend/EntranceController.signup',
  'GET    /email/confirm':                              '_frontend/EntranceController.email_confirm',

  'GET    /login':                                      '_frontend/EntranceController.login',
  'GET    /password/forgot':                            '_frontend/EntranceController.password_forgot',
  'GET    /password/new':                               '_frontend/EntranceController.password_new',

  'GET    /account':                                    '_frontend/AccountController.overview',
  'GET    /account/password':                           '_frontend/AccountController.password_edit',
  'GET    /account/profile':                            '_frontend/AccountController.profile_edit',
  'GET    /account/orders':                             '_frontend/AccountController.orders',

  'GET    /orders':                                     '_frontend/OrderController.overview',
  'GET    /orders/create':                              '_frontend/OrderController.create',
  'GET    /orders/update':                              '_frontend/OrderController.update',

  'GET    /promo-codes':                                '_frontend/PromoCodesController.overview',
  'GET    /promo-codes/create':                         '_frontend/PromoCodesController.create',
  'GET    /promo-codes/update':                         '_frontend/PromoCodesController.update',

  'GET    /products':                                   '_frontend/products/ProductController.overview',
  'GET    /products/recent':                            '_frontend/products/ProductController.recent',
  'GET    /products/view/category/:slug':               '_frontend/products/ProductController.view_by_cat',
  'GET    /products/create':                            '_frontend/products/ProductController.create',
  'GET    /products/update':                            '_frontend/products/ProductController.update',

  'GET    /products/categories':                        '_frontend/products/CategoryController.overview',
  'GET    /products/categories/create':                 '_frontend/products/CategoryController.create',
  'GET    /products/categories/update':                 '_frontend/products/CategoryController.update',

  'GET    /uploaded-images':                            '_frontend/UploadedImagesController.overview',

  'GET    /users':                                      '_frontend/UserController.overview',
  'GET    /users/create':                               '_frontend/UserController.create',
  'GET    /users/update':                               '_frontend/UserController.update',

  'GET    /cron-locks':                                 '_frontend/CronLockController.overview',
  'GET    /cron-locks/update':                          '_frontend/CronLockController.update',

  // // ***** Blog Frontend *****
  'GET    /blog/posts':                                 '_frontend/Blog/PostsController.overview',
  'GET    /blog/posts/recent':                          '_frontend/Blog/PostsController.recent',
  'GET    /blog/posts/view/:slug':                      '_frontend/Blog/PostsController.view_by_slug',
  'GET    /blog/posts/view/category/:slug':             '_frontend/Blog/PostsController.view_by_cat',
  'GET    /blog/posts/create':                          '_frontend/Blog/PostsController.create',
  'GET    /blog/posts/update':                          '_frontend/Blog/PostsController.update',

  'GET    /blog/categories':                            '_frontend/Blog/CategoryController.overview',
  'GET    /blog/categories/create':                     '_frontend/Blog/CategoryController.create',
  'GET    /blog/categories/update':                     '_frontend/Blog/CategoryController.update',
  // *************************

  // ***** Email Blasts Frontend *****
  'GET    /email-blasts':                               '_frontend/EmailBlastsController.overview',
  'GET    /email-blasts/view/:slug':                    '_frontend/EmailBlastsController.view_by_slug',
  'GET    /email-blasts/create':                        '_frontend/EmailBlastsController.create',
  'GET    /email-blasts/update':                        '_frontend/EmailBlastsController.update',
  // *************************

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  // …
  // '/terms':                   '/legal/terms',

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …
  // 'POST   /api/stripe-webhook':                         { action: 'stripe-webhook', csrf: false },

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // …
  'GET    /api/csrfToken':                              { action: 'security/grant-csrf-token' },

  'POST   /api/deliver-contact-form-message':           { action: 'deliver-contact-form-message', csrf: false },

  'PUT    /api/entrance/login':                         { action: 'entrance/login',
                                                          cors: {
                                                            allowOrigins: '*',
                                                            allowCredentials: true,
                                                            allowAnyOriginWithCredentialsUnsafe: true,
                                                          },
                                                          csrf: false
                                                        },
  'POST   /api/entrance/signup':                        { action: 'entrance/signup', csrf: false },
  'POST   /api/entrance/send-password-recovery-email':  { action: 'entrance/send-password-recovery-email', csrf: false },
  'POST   /api/entrance/update-password-and-login':     { action: 'entrance/update-password-and-login', csrf: false },
  'POST   /api/entrance/email/confirm':                 { action: 'entrance/confirm-email' },

  'GET    /api/account/logout':                         { action: 'account/logout' },
  'POST   /api/account/resend-verify-email':            { action: 'account/resend-verify-email' },
  'PUT    /api/account/update-password':                { action: 'account/update-password' },
  'PUT    /api/account/update-profile':                 { action: 'account/update-profile' },

  'POST   /api/order/create':                           { action: 'order/create' },
  'PUT    /api/order/update':                           { action: 'order/update' },
  'DELETE /api/order/delete':                           { action: 'order/delete' },

  'POST   /api/shipping-rate':                          { action: 'shipping-rate/get' },
  'POST   /api/tax-rate':                               { action: 'tax-rate/get' },

  'GET    /api/promo-code':                             { action: 'promo-code/get' },
  'POST   /api/promo-code/create':                      { action: 'promo-code/create' },
  'PUT    /api/promo-code/update':                      { action: 'promo-code/update' },
  'DELETE /api/promo-code/delete':                      { action: 'promo-code/delete' },

  'GET    /api/product/:id':                            { action: 'product/get-by-id' },
  'POST   /api/product/create':                         { action: 'product/create' },
  'PUT    /api/product/update':                         { action: 'product/update' },
  'DELETE /api/product/delete':                         { action: 'product/delete' },

  'POST   /api/product/category/get':                   { action: 'product/category/get', csrf: false },
  'POST   /api/product/category/create':                { action: 'product/category/create' },
  'PUT    /api/product/category/update':                { action: 'product/category/update' },
  'DELETE /api/product/category/delete':                { action: 'product/category/delete' },

  'POST   /api/user/create':                            { action: 'user/create' },
  'PUT    /api/user/update':                            { action: 'user/update' },
  'DELETE /api/user/delete':                            { action: 'user/delete' },

  'PUT    /api/cron-lock/update':                       { action: 'cron-lock/update' },

  // ***** Blog API endpoints *****
  'POST   /api/blog/post/create':                       { action: 'blog/post/create' },
  'PUT    /api/blog/post/update':                       { action: 'blog/post/update' },
  'DELETE /api/blog/post/delete':                       { action: 'blog/post/delete' },

  'POST   /api/blog/comment/create':                    { action: 'blog/comment/create' },
  'DELETE /api/blog/comment/delete':                    { action: 'blog/comment/delete' },

  'POST   /api/blog/category/get':                      { action: 'blog/category/get', csrf: false },
  'POST   /api/blog/category/create':                   { action: 'blog/category/create' },
  'PUT    /api/blog/category/update':                   { action: 'blog/category/update' },
  'DELETE /api/blog/category/delete':                   { action: 'blog/category/delete' },
  // ******************************

  // ***** Email Blasts API endpoints *****
  'POST   /api/email-blasts/create':                    { action: 'email-blasts/create' },
  'PUT    /api/email-blasts/update':                    { action: 'email-blasts/update' },
  'DELETE /api/email-blasts/delete':                    { action: 'email-blasts/delete' },
  // ******************************

  // ***** Images API endpoints *****
  'POST   /api/images/upload':                          { action: 'images/upload', csrf: false },
  'GET    /api/images/download/:fd':                    { action: 'images/download', skipAssets: false },
  // ******************************
};
