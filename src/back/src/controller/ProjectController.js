'use strict';

class  ProjectController {
  constructor({
    getProjects,
    addUser,
    deleteUserOfProject,
    createProject,
    deleteProject,
    updateProject,
  }) {
    this.getProjects = getProjects;
    this.addUser = addUser;
    this.createProject = createProject;
    this.deleteProject = deleteProject;
    this.updateProject = updateProject;
    this.deleteUserOfProject = deleteUserOfProject;
  }

  async getList() {
    return await this.getProjects.get();
  }

  async JoinningUsersToProjects() {
    return await this.getProjects.JoinUser();
  }

  async addUsers(id, userId) {
    console.log('addUser', id, userId);
    const addUsers = await this.addUser.execute(id, userId);
    //console.log('Ответ с commandAddUser', addUsers)
    return addUsers;
  }

  async deleteUserOfProjects(id, userId) {
    console.log('deleteUserOfProject', id, userId);
    return await this.deleteUserOfProject.execute(id, userId);
  }

  async update(filter, update) {
    console.log('UpdateProject', filter, update);
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
