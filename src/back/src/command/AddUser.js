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
    console.log('AddUser', filter, update);
    await this.projectModel.findOneAndUpdateUserInProject(filter, update);
    
    return true;
  }
}

module.exports = AddUser;
