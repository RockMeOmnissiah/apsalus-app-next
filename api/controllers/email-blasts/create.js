module.exports = {


  friendlyName: 'EmailBlastCreate',


  description: 'Create Email Blast.',


  inputs: {

    title: {
      type: 'string',
      required: true,
      unique: true,
      maxLength: 200
    },

    content: {
      type: 'string',
      required: true
    },

    scheduledFor: {
      type: 'string',
      required: false
    },

  },

  exits: {

    dbUpdateError: {
      description: `There was an issue updating the database.`,
      responseType: 'unauthorized'
    }

  },


  fn: async function ({title, content, scheduledFor}) {

    if (scheduledFor) {
      scheduledFor = (new Date(scheduledFor)).getTime();
    } else {
      scheduledFor = 0;
    }

    let newEmailBlast = await EmailBlast.create(_.extend({
      title: title,
      content: content,
      user: this.req.me.id,
      scheduledFor: scheduledFor
    })).fetch();

    if(!newEmailBlast) { throw 'dbUpdateError'; }

    return newEmailBlast;
  }
};
