'use strict';

class RemoveUserFromProject {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter, update) {
    this.logger.warn('deleteUserFromProject', filter , update);
    await this.projectModel.deleteUserFromProject(filter, update);
    return true;
  }
}

module.exports = RemoveUserFromProject;