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
      this.logger.debug('CreateUser', params);
      const result = await this.userModel.insertOne(params);
      this.logger.debug('CreateUser 2', result);
      return true;
    }
  }
  
  module.exports = CreateUser;