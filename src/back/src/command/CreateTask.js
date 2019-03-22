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
    

    //Тут полученый массив превращаеться в обьект.
    const ParseAnswerOnCommand = answerOnCommand.reduce(function(obj , item){
      for(var i=0 ; i<12; i++){
        var key = Object.keys(item)[i];
        obj[key] = item[key];
      }
      return obj;
    }, {});
      //console.log("Переменная ParseAnswerOnCommand!" , ParseAnswerOnCommand);

      
    var str = ('');
    var strName = ('');
      for(var item in ParseAnswerOnCommand){
        if (ParseAnswerOnCommand.hasOwnProperty(item)) {
          str += ParseAnswerOnCommand[item] + ' ';
          strName = ParseAnswerOnCommand[item] + ' ';
         }
          //console.log("Значение", ParseAnswerOnCommand[item])
      };
       //console.log("Значение str", str)
  

    var values = str.split(' ' , 10);
    var valueName = strName;
  
    var taskId = values[0];
    var id = values[1];
    var userId = values[2];
    var dateOne = values[3];
    var dateTwo = values[4];
    var string_x = values[5];
    var string_y = values[6];
    var string_w = values[7];
    var string_h = values[8];
    var rgb = values[9];
    var name = valueName;

    var x = Number.parseInt(string_x);
    var y = Number.parseInt(string_y);
    var w = Number.parseInt(string_w);
    var h = Number.parseInt(string_h);
    
    //console.log("name: ", name);
  
      
    const addTaskOnProject = await this.projectModel.findOneAndUpdateTaskInUsers(id , userId , taskId , dateOne , dateTwo , x , y , w , h , rgb, name);
      //console.log(addTaskOnProject , "Ответ с model");
    return true;
  }
}
module.exports = CreateTask;
