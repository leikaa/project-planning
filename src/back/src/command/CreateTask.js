/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
// 'use strict';

class CreateTask {
  constructor({
    logger,
    taskModel,
    userModel,
  }) {
    this.logger = logger;
    this.taskModel = taskModel;
    this.userModel = userModel;
  }

  async execute(params) {
    this.logger.debug('CreateTask', params);
    const result = await this.taskModel.insertOne(params);
    this.logger.debug('CreateTask 2', result);
    try {
      const answerOnCommand = await this.taskModel.getLastTask();
      // console.log("Последняя добавленная задача" , answerOnCommand);

      const ParseAnswerOnCommand = answerOnCommand.reduce((obj, item) => {
        for (let i = 0; i < 2; i += 1) {
          const key = Object.keys(item)[i];
          obj[key] = item[key];
        }
        return obj;
      }, {});
      console.log('Обьект c последней добавленой задачей', ParseAnswerOnCommand);

      // Тут обьект превращается в строку.
      let ValueString = ('');
      for (var item in ParseAnswerOnCommand) {
        if (ParseAnswerOnCommand.hasOwnProperty(item)) {
          ValueString += ParseAnswerOnCommand[item] + ' ';
        }
      }
      // console.log("Значение ValueString", ValueString)
      // Тут строка превращается в массив для удобства дальнейшего присвоения.
      const values = ValueString.split(' ', 2);
      const taskId = values[0];
      const id = values[1];
      if (id === '') {
        return result;
      }

      await this.userModel.addTaskToUser(id, taskId);
    } catch (err) {
      console.error('Error create task: ', err);
    }

    return true;
  }
}
module.exports = CreateTask;
