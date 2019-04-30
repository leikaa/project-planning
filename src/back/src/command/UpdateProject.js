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
    try {
      this.logger.debug('UpdateProject', filter, update);
      const id = update.id;
      delete(update.id);
      await this.projectModel.findOneAndUpdate(filter, update);
      update._id = id;
      return true;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = UpdateProject;