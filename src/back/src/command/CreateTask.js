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
    
    const answerOnCommand = await this.taskModel.getLastTask(filter, projection);
    //console.log("Последняя добавленная задача" , answerOnCommand);
    


    //Тут полученый массив превращаеться в обьект.
    const ParseAnswerOnCommand = answerOnCommand.reduce(function(obj , item){
      for(var i=0 ; i < 3; i++){
        var key = Object.keys(item)[i];
        obj[key] = item[key];
      }
      return obj;
    }, {});
      //console.log("Обьект c последней добавленой задачей" , ParseAnswerOnCommand);


    //Тут обьект превращается в строку.
    var ValueString = ('');
      for(var item in ParseAnswerOnCommand){
        if (ParseAnswerOnCommand.hasOwnProperty(item)) {
          ValueString += ParseAnswerOnCommand[item] + ' ';
         }
      };
      //console.log("Значение ValueString", ValueString)
  

    //Тут строка превращается в массив для удобства дальнейшего присвоения.
    var values = ValueString.split(' ' , 3);
    var taskId = values[0];
    var id = values[1];
    var userId = values[2];

   await this.projectModel.findOneAndUpdateTaskInUsers(id , userId , taskId );
   return true;
  }
}
module.exports = CreateTask;

