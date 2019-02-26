'use strict';

class GetTasks {
  constructor({ logger, taskModel }) {
    this.logger = logger;
    this.taskModel = taskModel;
  }

  async get(filter, projection) {
    // console.log('get', filter, projection);
    const result = await this.taskModel.getList(filter, projection);
    return result;
  }
}

module.exports = GetTasks;