'use strict';

class RemoveTaskFromProject {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter , update) {
    this.logger.warn('deleteTaskFromProject', filter , update);
    await this.projectModel.deleteTaskFromProject(filter, update);
  }
}

module.exports = RemoveTaskFromProject;