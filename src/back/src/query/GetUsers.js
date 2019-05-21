class GetUsers {
  constructor({
    logger,
    userModel,
  }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async get(filter, projection) {
    const users = await this.userModel.getList(filter, projection);
    return users;
  }
}

module.exports = GetUsers;
