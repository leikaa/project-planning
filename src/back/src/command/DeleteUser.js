'use strict';

class DeleteUser {
  constructor({
    logger,
    userModel,
  }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async execute(filter) {
    try {
      this.logger.warn('DeleteTask', filter);
      await this.userModel.deleteOne(filter);
      return true
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = DeleteUser;