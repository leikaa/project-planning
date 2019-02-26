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
    console.log('DeleteUser', filter);
    await this.userModel.deleteOne(filter);
    return true;
  }
}

module.exports = DeleteUser;