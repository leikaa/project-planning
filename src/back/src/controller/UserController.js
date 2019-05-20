/* eslint-disable no-console */
class UserController {
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
    try {
      return await this.getUsers.get();
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async update(filter, update) {
    try {
      return await this.updateUser.execute(filter, update);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async create(params) {
    try {
      return await this.createUser.execute(params);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async delete(params) {
    try {
      return await this.deleteUser.execute(params);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async deleteTaskFromUser(id, taskId) {
    try {
      return await this.removeTaskFromUser.execute(id, taskId);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async addTasks(id, taskId) {
    try {
      return await this.addTaskToUser.execute(id, taskId);
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = UserController;
