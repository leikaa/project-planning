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
        const elements = { ...obj };
        for (let i = 0; i < 2; i += 1) {
          const key = Object.keys(item)[i];
          elements[key] = item[key];
        }
        return elements;
      }, {});
      console.log('Обьект c последней добавленой задачей', ParseAnswerOnCommand);
      // Тут строка превращается в массив для удобства дальнейшего присвоения.
      const ValueString = Object.values(ParseAnswerOnCommand);
      const taskId = ValueString[0];
      const id = ValueString[1];
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
