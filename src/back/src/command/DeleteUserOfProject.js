'use strict';

class DeleteUserOfProject {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter, update) {
    this.logger.warn('DeleteUserOfProject', filter , update);
    await this.projectModel.findOneAndUpdateUserDelProject(filter, update);
    return true;
  }
}

module.exports = DeleteUserOfProject;