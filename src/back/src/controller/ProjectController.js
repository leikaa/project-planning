'use strict';

class  ProjectController {
  constructor({
    getProjects,
    getProject,
    addUser,
    delUser,
    createProject,
    deleteProject,
    updateProject,
  }) {
    this.getProjects = getProjects;
    this.getProject = getProject;
    this.addUser = addUser;
    this.createProject = createProject;
    this.deleteProject = deleteProject;
    this.updateProject = updateProject;
    this.delUser =delUser;
  }

  async getList() {
    return await this.getProjects.get();
  }

  async get(params) {
    //console.log('getProject', params);
    return await this.getProject.get(params);
  }

  async addUsers(id, userId) {
    //console.log('addUser', id, userId);
    return await this.addUser.execute(id, userId);
  }

  async delUsers(id, userId) {
    //console.log('addUser', id, userId);
    return await this.delUser.execute(id, userId);
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
