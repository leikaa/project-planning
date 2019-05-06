'use strict';

class AddUser {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter, update) {
    await this.projectModel.addUserToProject(filter, update);
    await this.projectModel.sortUsersToProject(filter, update);
    return true;
  }
}

module.exports = AddUser;