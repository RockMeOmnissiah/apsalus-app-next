/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

 module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
      'express-rate-limit'
    ],
    'express-rate-limit': require('express-rate-limit')({
      windowMs: 1 * 60 * 1000, // 1 minute(s)
      max: 60 // limit each IP to X requests per windowMs
    }),

    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    bodyParser: (function () {
      // const bodyParser = require("body-parser");
      const skipper = require('skipper')();

      return function(req, res, next){
        // rawBody available to stripe webhook
        // if (req.url === '/api/stripe-webhook') {
        //   return bodyParser.json({
        //     limit: '10mb',
        //     type: 'application/json',
        //     strict: false,
        //     verify: function (req, res, buf, encoding) {
        //       if (buf && buf.length){
        //         req.rawBody = buf.toString(encoding || 'utf8');
        //       }
        //     },
        //   })(req, res, next);
        // } else {
          return skipper(req, res, next);
        // }
      }
    })()

  },

};
