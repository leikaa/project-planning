'use strict';

const Model = require('./Model')

class UserModel extends Model {
  constructor({ db }) {
    super({ db, collectionName: 'user' })
  }
}

module.exports = UserModel;
