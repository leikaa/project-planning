'use strict';

class GetUsers {
  constructor({
    logger,
    userModel
  }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async get(filter, projection) {
    return await this.userModel.getList(filter, projection);
  }
}

module.exports = GetUsers;