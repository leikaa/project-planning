// 'use strict';

class AddTaskToUser {
  constructor({
    logger,
    userModel,
  }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async execute(filter, update) {
    await this.userModel.addTaskToUser(filter, update);
    return true;
  }
}

module.exports = AddTaskToUser;
