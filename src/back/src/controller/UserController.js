'use strict';

class  UserController {
  constructor({
    getUsers,
    updateUser,
    createUser,
    deleteUser,
    removeTaskFromProject,
  }) {
    this.getUsers = getUsers;
    this.updateUser = updateUser;
    this.createUser = createUser;
    this.deleteUser = deleteUser;
    this.removeTaskFromProject = removeTaskFromProject;
  }

  async getList() {
    return await this.getUsers.get();
  }

  async update(filter, update) {
    console.log('UpdateUser', filter, update);
    return await this.updateUser.execute(filter, update);
  }

  async create(params) {
    return await this.createUser.execute(params);
  }

  async delete(params) {
    return await this.deleteUser.execute(params);
  }

  async deleteTaskFromProject(id, taskId) {
    console.log('removeTaskFromProject', id, taskId);
    return await this.removeTaskFromProject.execute(id, taskId);
  }
}

module.exports = UserController;