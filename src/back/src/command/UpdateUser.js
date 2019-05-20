/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
// 'use strict';

class UpdateUser {
  constructor({
    logger,
    userModel,
  }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async execute(filter, update) {
    this.logger.debug('UpdateUser', filter, update);
    const id = update;
    delete update.id;
    await this.userModel.findOneAndUpdate(filter, update);
    update._id = id;
    return true;
  }
}

module.exports = UpdateUser;
