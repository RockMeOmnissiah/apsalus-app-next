module.exports = {


  friendlyName: 'EmailBlastUpdate',


  description: 'Update Email Blast.',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

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


  fn: async function ({id, title, content, scheduledFor}) {

    if (scheduledFor) {
      scheduledFor = (new Date(scheduledFor)).getTime();
    } else {
      scheduledFor = 0;
    }


    let updateEmailBlast = await EmailBlast.updateOne({
      id: id
    })
    .set(_.extend({
      title: title,
      content: content,
      scheduledFor: scheduledFor
    }));

    if(!updateEmailBlast) { throw 'dbUpdateError'; }

    return updateEmailBlast;
  }
};
