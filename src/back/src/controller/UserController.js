'use strict';

class  UserController {
  constructor({
    getUsers,
    updateUser,
    createUser,
    deleteUser,
  }) {
    this.getUsers = getUsers;
    this.updateUser = updateUser;
    this.createUser = createUser;
    this.deleteUser = deleteUser;
  }

  async getList() {
    return await this.getUsers.get();
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