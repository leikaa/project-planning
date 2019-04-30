'use strict';

class GetTask {
  constructor({
    logger,
    taskModel
  }) {
    this.logger = logger;
    this.taskModel = taskModel;
  }

  async get(filter, projection) {
    return await this.taskModel.getList(filter, projection);
  }
}

module.exports = GetTask;