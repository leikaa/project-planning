'use strict';

class CreateProject {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(params) {
    try {
      this.logger.debug('CreateProject', params);
      const result = await this.projectModel.insertOne(params);
      this.logger.debug('CreateProject result', result);
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = CreateProject;