'use strict';
//Получает данные с command либо обрабатывает тут(если есть функция), либо отправляет дальше на model.

const Model = require('./Model')

class TaskModel extends Model {
  constructor({ db }) {
    super({ db, collectionName: 'TaskList' })
  }

  async getLastTask() {
    return this.findLastTask().toArray();
  }

  findLastTask() {
    return this.db.get()
      .collection(this.collectionName)     
      .find(this.getFilter()).project().sort({_id: -1}).limit(1); 
  }
}

module.exports = TaskModel;

