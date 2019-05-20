/* eslint-disable no-console */
class TaskController {
  constructor({
    getTask,
    createTask,
    deleteTask,
    updateTask,
  }) {
    this.getTask = getTask;
    this.createTask = createTask;
    this.deleteTask = deleteTask;
    this.updateTask = updateTask;
  }

  async getList() {
    try {
      return await this.getTask.get();
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async create(params) {
    try {
      return await this.createTask.execute(params);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async delete(params) {
    try {
      return await this.deleteTask.execute(params);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async update(filter, update) {
    try {
      return await this.updateTask.execute(filter, update);
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = TaskController;
