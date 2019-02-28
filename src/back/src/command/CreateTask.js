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
      //console.log("Последняя добавленая задача" , answerOnCommand);
    

      //Тут полученый массив превращаеться в обьект (Если нужен только _id нужно убрать цикл)
    const ParseAnswerOnCommand = answerOnCommand.reduce(function(obj , item){
      for(var i=0 ; i<10; i++){
        var key = Object.keys(item)[i];
        obj[key] = item[key];
      }
      return obj;
    }, {});
      //console.log("Переменная ParseAnswerOnCommand!" , ParseAnswerOnCommand);


    var str = ('');
      for(var item in ParseAnswerOnCommand){
        if (ParseAnswerOnCommand.hasOwnProperty(item)) {
          str += ParseAnswerOnCommand[item] + ' ';
         }
          //console.log("Значение", ParseAnswerOnCommand[item])
      };
       //console.log("Значение str", str)
      
    var values = str.split(' ');

    var taskId = values[0];
    var id = values[3];
    var userId = values[4];
    var string_x = values[5];
    var string_y = values[6];
    var string_w = values[7];
    var string_h = values[8];
    var bgc = values[9];

    var x = Number.parseInt(string_x);
    var y = Number.parseInt(string_y);
    var w = Number.parseInt(string_w);
    var h = Number.parseInt(string_h);
  

    //console.log("Это _id таска", taskId);
    //console.log("Это _id таска", id);
    //console.log("Это userId ", userId);
  
      

    const addTaskOnProject = await this.projectModel.findOneAndUpdateTaskInUsers(id , userId , taskId , x , y , w , h , bgc );
      console.log(addTaskOnProject , "Ответ с model");
    return true;
  }
}
module.exports = CreateTask;
