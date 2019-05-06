'use strict';

class RemoveTaskFromProject {
  constructor({
    logger,
    userModel,
  }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async execute(filter, update) {
    this.logger.warn('deleteTaskFromProject', filter, update);
    await this.userModel.deleteTaskFromProject(filter, update);
    return true
  }
}

module.exports = RemoveTaskFromProject;