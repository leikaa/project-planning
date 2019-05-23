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
    const obj = update;
    delete obj.id;
    await this.userModel.findOneAndUpdate(filter, update);
    obj._id = obj;
    return true;
  }
}

module.exports = UpdateUser;
