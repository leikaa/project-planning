'use strict';

class DelUser {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter, update) {
    console.log('deleteUserOfProject', filter, update);
    await this.projectModel.findOneAndUpdateUserDelProject(filter, update);
    return true;
  }
}

module.exports = DelUser;