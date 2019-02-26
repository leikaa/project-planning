'use strict';

class  TaskController {
  constructor({
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
  }) {
    this.getTasks = getTasks;
    this.getTask = getTask;
    this.createTask = createTask;
    this.deleteTask = deleteTask;
    this.updateTask = updateTask;
  }

  async getList() {
    return await this.getTasks.get();
  }

  async get(params) {
    console.log('getTask', params);
    return await this.getTask.get(params);
  }

  async create(params) {
    return await this.createTask.execute(params);
  }

  async delete(params) {
    return await this.deleteTask.execute(params);
  }

  async update(filter, update) {
    console.log('updateTask', filter, update);
    return await this.updateTask.execute(filter, update);
  }
 
}

module.exports = TaskController;