module.exports = {


  friendlyName: 'CronLockUpdate',


  description: 'Update CronLock.',


  inputs: {

    id: {
      type: 'string',
      required: true
    },

    isLocked: {
      type: 'boolean',
      required: true,
    },

  },

  exits: {
  },


  fn: async function ({id, isLocked}) {

    let updateCronLock = await CronLock.updateOne({
      id: id
    })
    .set(_.extend({
      isLocked: isLocked
    }));

    if(!updateCronLock) { throw 'dbUpdateError'; }

    return updateCronLock;
  }
};
