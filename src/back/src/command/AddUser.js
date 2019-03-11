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
    const answer = await this.projectModel.findOneAndUpdateUserInProject(filter, update);
    //console.log("Это переменная answer" , answer)
    return true;
  }
}

module.exports = AddUser;
