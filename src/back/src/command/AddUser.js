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
    try {
      await this.projectModel.addUserToProject(filter, update);
      await this.projectModel.sortUsersToProject(filter, update);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = AddUser;