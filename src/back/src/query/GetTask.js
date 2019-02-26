'use strict';

class GetTask {
  constructor({ logger, taskModel }) {
    this.logger = logger;
    this.taskModel = taskModel;
  }

  async get(params) {
    // console.log('GetTask', params);
    const result = await this.taskModel.getObject(params);
    return result;
  }
}

module.exports = GetTask;
