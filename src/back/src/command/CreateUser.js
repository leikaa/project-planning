'use strict';

class CreateUser {
  constructor({
    logger,
    userModel,
  }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async execute(params) {
    try {
      this.logger.debug('CreateUser', params);
      params.task = [];
      const result = await this.userModel.insertOne(params);
      this.logger.debug('CreateUser 2', result);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = CreateUser;