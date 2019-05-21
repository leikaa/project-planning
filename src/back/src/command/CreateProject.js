// 'use strict';

class CreateProject {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(params) {
    this.logger.debug('CreateProject', params);
    const project = await this.projectModel.insertOne(params);
    this.logger.debug('CreateProject', project);
    return true;
  }
}

module.exports = CreateProject;
