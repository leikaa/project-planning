'use strict';

class DeleteTask {
  constructor({
    logger,
    taskModel,
  }) {
    this.logger = logger;
    this.taskModel = taskModel;
  }

  async execute(filter) {
    try {
      this.logger.warn('DeleteTask', filter);
      await this.taskModel.deleteOne(filter);
      return true
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = DeleteTask;