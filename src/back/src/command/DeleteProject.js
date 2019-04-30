'use strict';

class DeleteProject {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter) {
    try {
      this.logger.warn('DeleteProject', filter);
      await this.projectModel.deleteOne(filter);
      return true
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = DeleteProject;