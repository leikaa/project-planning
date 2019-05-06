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
    this.logger.warn('DeleteProject', filter);
    await this.projectModel.deleteOne(filter);
    return true
  }
}

module.exports = DeleteProject;