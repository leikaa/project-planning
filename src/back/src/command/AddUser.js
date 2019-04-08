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
   
    const answer = await this.projectModel.addUserToProject(filter, update);
    //console.log("Это переменная answer" , answer)

    const answer2 = await this.projectModel.sortUsersToProject(filter, update);
    //console.log("Сортировка проекта" , answer2)

    return true;
  }
}

module.exports = AddUser;
