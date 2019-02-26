'use strict';

class GetUser {
  constructor({ logger, userModel }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async get(params) {
    // console.log('GetUser', params);
    const result = await this.userModel.getObject(params);
    return result;
  }
}

module.exports = GetUser;