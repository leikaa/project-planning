'use strict';

class  UserController {
  constructor({
    getUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser,
  }) {
    this.getUsers = getUsers;
    this.getUser = getUser;
    this.updateUser = updateUser;
    this.createUser = createUser;
    this.deleteUser = deleteUser;
  }

  async getList() {
    return await this.getUsers.get();
  }

  async get(params) {
    console.log('getUser', params);
    return await this.getUser.get(params);
  }

  async update(filter, update) {
    console.log('updateUser', filter, update);
    return await this.updateUser.execute(filter, update);
  }

  async create(params) {
    return await this.createUser.execute(params);
  }

  async delete(params) {
    return await this.deleteUser.execute(params);
  }
}

module.exports = UserController;