class GetTask {
  constructor({
    logger,
    taskModel,
  }) {
    this.logger = logger;
    this.taskModel = taskModel;
  }

  async get(filter, projection) {
    const task = await this.taskModel.getList(filter, projection);
    return task;
  }
}

module.exports = GetTask;
