'use strict';

class DeleteTaskOfProject {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter , update) {
    this.logger.warn('DeleteTaskOfProject', filter , update);
    await this.projectModel.findOneAndUpdateDeleteTask(filter, update);
  }
}

module.exports = DeleteTaskOfProject;