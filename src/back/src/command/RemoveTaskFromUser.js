// 'use strict';

class RemoveTaskFromUser {
  constructor({
    logger,
    userModel,
  }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async execute(filter, update) {
    this.logger.warn('deleteTaskFromUser', filter, update);
    await this.userModel.deleteTaskFromUser(filter, update);
    return true;
  }
}

module.exports = RemoveTaskFromUser;
