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
    const obj = update;
    delete (obj.id);
    await this.taskModel.findOneAndUpdate(filter, update);
    obj._id = obj;
    return true;
  }
}

module.exports = UpdateTask;
