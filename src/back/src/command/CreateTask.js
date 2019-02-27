'use strict';
//Получает данные с controller, отправляет данные на модель и ждет получения данных назад.

class CreateTask {
  constructor({
    logger,
    taskModel,
    projectModel,
  }) {
    this.logger = logger;
    this.taskModel = taskModel;
    this.projectModel = projectModel;
  }

  async execute(params , filter, projection) {
    this.logger.debug('CreateTask', params);
    const result = await this.taskModel.insertOne(params);
    this.logger.debug('CreateTask 2', result);
      //console.log(result , 'Это result  в CreateTask!');

    const answerOnCommand = await this.taskModel.getLastTask(filter, projection);
    console.log(answerOnCommand , "Последняя добавленая задача");

    const ParseAnswerOnCommand = answerOnCommand.reduce(function(obj , item){
      var key = Object.keys(item)[0];
      obj[key] = item[key];
      return obj;
    }, {});


    const addTaskOnProject = await this.projectModel.insertOneTask(ParseAnswerOnCommand);
    console.log(addTaskOnProject , "Переменная test!");

      //const sendTasjOnUser = await this.projectModel.findOneAndUpdateUserInProject(result);
    //this.logger.debug('Полученый ответ о добавлении таска в проект и участника', sendTaskOnUser);
    

    return true;
  }
}

module.exports = CreateTask;
