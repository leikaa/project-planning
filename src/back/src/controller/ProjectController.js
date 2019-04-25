'use strict';

class  ProjectController {
  constructor({
    getProjects,
    addUser,
    removeUserFromProject,
    createProject,
    deleteProject,
    updateProject,
    logger,
  }) {
    this.getProjects = getProjects;
    this.addUser = addUser;
    this.removeUserFromProject = removeUserFromProject;
    this.createProject = createProject;
    this.deleteProject = deleteProject;
    this.updateProject = updateProject;
    this.logger = logger;
  }

  async getList() {
    return await this.getProjects.get();
  }

  async addUsers(id, userId){
    console.log('addUser', id, userId);
    const addUsers = await this.addUser.execute(id, userId);
    //console.log('Ответ с commandAddUser', addUsers)
    return addUsers;
  }

  async deleteUserFromProject(id, userId) {
    console.log('removeUserFromProject', id, userId);
    return await this.removeUserFromProject.execute(id, userId);
  }

  async create(params) {
    return await this.createProject.execute(params);
  }

  async delete(params) {
    return await this.deleteProject.execute(params);
  }

  async update(filter, update) {
    console.log('UpdateProject', filter, update);
    return await this.updateProject.execute(filter, update);
  }
 
}

module.exports = ProjectController;
