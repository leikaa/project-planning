'use strict';

class  UserController {
  constructor({
    getUsers,
    updateUser,
    createUser,
    deleteUser,
    removeTaskFromUser,
    addTaskToUser,
  }) {
    this.getUsers = getUsers;
    this.updateUser = updateUser;
    this.createUser = createUser;
    this.deleteUser = deleteUser;
    this.removeTaskFromUser = removeTaskFromUser;
    this.addTaskToUser = addTaskToUser;
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

  async deleteTaskFromUser(id, taskId) {
    console.log('removeTaskFromUser', id, taskId);
    return await this.removeTaskFromUser.execute(id, taskId);
  }

  async addTasks(id, taskId) {
    return await this.addTaskToUser.execute(id, taskId);
  }
}

module.exports = UserController;