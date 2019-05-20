/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
// 'use strict';

class UpdateTask {
  constructor({
    logger,
    taskModel,
    projectModel,
  }) {
    this.logger = logger;
    this.taskModel = taskModel;
    this.projectModel = projectModel;
  }

  async execute(filter, update) {
    this.logger.debug('UpdateTask', filter, update);
    const id = update;
    delete (update.id);
    await this.taskModel.findOneAndUpdate(filter, update);
    update._id = id;
    return true;
  }
}

module.exports = UpdateTask;
