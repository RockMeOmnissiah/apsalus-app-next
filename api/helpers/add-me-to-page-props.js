module.exports = {


  friendlyName: 'Add me (user) to page props',


  description: 'Destructively remove properties from the provided User record to prepare it for publication.',


  sync: true,


  inputs: {

    req: {
      type: 'ref',
      readOnly: false
    }

  },


  fn: function ({ req }) {

    const { params, query } = req;
    if (req.me) {

      var sanitizedUser = _.extend({}, req.me);
      sails.helpers.redactUser(sanitizedUser);

      if (query) {
        query.me = sanitizedUser;
      } else {
        query = {
          me: sanitizedUser
        };
      };
    }

    // sails.log.error(query);
    return {
      params: params,
      query: query
    }
  }


};

