'use strict';
//Получает данные с router и отправляет с command

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
    return await this.getTask.get();
  }

  async create(params) {
    return await this.createTask.execute(params);
  }

  async delete(params) {
    return await this.deleteTask.execute(params);
  }

  async update(filter, update) {
    console.log('UpdateTask', filter, update);
    return await this.updateTask.execute(filter, update);
  }

}

module.exports = TaskController;