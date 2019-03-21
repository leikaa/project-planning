'use strict';

class UpdateProject {
  constructor({
    logger,
    projectModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

  async execute(filter, update) {
    //console.log('UpdateProject', filter, update);
    const id = update.id;
    delete(update.id);
    await this.projectModel.findOneAndUpdate(filter, update);
    update._id = id;
    return true;
  }
}

module.exports = UpdateProject;