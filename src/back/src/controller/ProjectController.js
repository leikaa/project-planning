'use strict';

class  ProjectController {
  constructor({
    getProjects,
    addUser,
    createProject,
    deleteProject,
    updateProject,
  }) {
    this.getProjects = getProjects;
    this.addUser = addUser;
    this.createProject = createProject;
    this.deleteProject = deleteProject;
    this.updateProject = updateProject;
  }

  async getList() {
    return await this.getProjects.get();
  }

  async JoinningUsersToProjects() {
    return await this.getProjects.JoinUser();
  }
/*
  async JoiningUserTasksToProjects() {
    return await this.getProjects.JoinTask();
  }
*/
  async addUsers(id, userId) {
    console.log('addUser', id, userId);
    const addUsers = await this.addUser.execute(id, userId);
    console.log('Ответ с commandAddUser', addUsers)
    return addUsers;
  }

  async update(filter, update) {
    console.log('updateProject', filter, update);
    return await this.updateProject.execute(filter, update);
  }

  async create(params) {
    return await this.createProject.execute(params);
  }

  async delete(params) {
    return await this.deleteProject.execute(params);
  }
  
}

module.exports = ProjectController;
