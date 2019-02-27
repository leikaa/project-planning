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
    

      //Тут полученый массив превращаеться в обьект
    const ParseAnswerOnCommand = answerOnCommand.reduce(function(obj , item){
      for(var i=0 ; i<6; i++){
        var key = Object.keys(item)[i];
        obj[key] = item[key];
      }
      return obj;
    }, {});
      console.log(ParseAnswerOnCommand , "Переменная ParseAnswerOnCommand!");

    const addTaskOnProject = await this.projectModel.findOneAndUpdateTaskInUsersOnProject(ParseAnswerOnCommand);
      //console.log(addTaskOnProject , "Переменная test!");
    return true;
  }
}

module.exports = CreateTask;





     /*Перевод в строку
      function objToString (ParseAnswerOnCommand) {
        var str = '';
        for (var p in ParseAnswerOnCommand) {
            if (ParseAnswerOnCommand.hasOwnProperty(p)) {
                str += p + '::' + ParseAnswerOnCommand[p] + '\n';
            }
        }
        console.log(objToString , 'Строка')
        console.log(str , 'str')
        return str;
    };
*/