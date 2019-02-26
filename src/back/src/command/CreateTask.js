'use strict';

class CreateTask {
  constructor({
    logger,
    taskModel,
  }) {
    this.logger = logger;
    this.taskModel = taskModel;
  }

  async execute(params) {
    this.logger.debug('CreateTask', params);
    const result = await this.taskModel.insertOne(params);
    this.logger.debug('CreateTask 2', result);
    return true;
  }
}

module.exports = CreateTask;
