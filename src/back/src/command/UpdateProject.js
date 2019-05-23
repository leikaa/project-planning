// 'use strict';

class UpdateProject {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter, update) {
    this.logger.debug('UpdateProject', filter, update);
    const obj = update;
    delete (obj.id);
    await this.projectModel.findOneAndUpdate(filter, update);
    obj._id = obj;
    return true;
  }
}

module.exports = UpdateProject;
