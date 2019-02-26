'use strict';

const Model = require('./Model')

class TaskModel extends Model {
  constructor({ db }) {
    super({ db, collectionName: 'TaskList' })
  }
}

module.exports = TaskModel;

