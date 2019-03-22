'use strict';

class UpdateTask {
  constructor({
    logger,
    taskModel,
  }) {
    this.logger = logger;
    this.taskModel = taskModel;
  }

  async execute(filter, update) {
    this.logger.debug('UpdateTask', filter , update);
    const id = update.id;
    delete(update.id);
    await this.taskModel.findOneAndUpdate(filter, update);
    update._id = id;
    return true;
  }
}

module.exports = UpdateTask;