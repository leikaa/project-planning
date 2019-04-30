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
    try {
      this.logger.warn('deleteUserFromProject', filter, update);
      await this.projectModel.deleteUserFromProject(filter, update);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = RemoveUserFromProject;