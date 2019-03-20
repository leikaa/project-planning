'use strict';
//Получает данные с router и отправляет с command

class  TaskController {
  constructor({
    getTask,
    createTask,
    deleteTask,
  }) {
    this.getTask = getTask;
    this.createTask = createTask;
    this.deleteTask = deleteTask;
  }

  async getList() {
    return await this.getTask.get();
  }

  async create(params) {
    //console.log(params , 'Этот обьект отправляеться в command createTask')
    const test = await this.createTask.execute(params);
    //console.log(test , 'Этот обьект получен из command createTask')
    return test;
  }
}

module.exports = TaskController;