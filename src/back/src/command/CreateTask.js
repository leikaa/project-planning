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
      for(var i=0 ; i < 12; i++){
        var key = Object.keys(item)[i];
        obj[key] = item[key];
      }
      return obj;
    }, {});
      //console.log("Обьект c последней добавленой задачей" , ParseAnswerOnCommand);


    //Тут обьект превращается в строку.
    var ValueString = ('');
    //var LastValue = ('');
      for(var item in ParseAnswerOnCommand){
        if (ParseAnswerOnCommand.hasOwnProperty(item)) {
          ValueString += ParseAnswerOnCommand[item] + ' ';
          //LastValue = ParseAnswerOnCommand[item] + ' ';
         }
          //console.log("Значение", ParseAnswerOnCommand[item])
      };
      // console.log("Значение ValueString", ValueString)
  

    //Тут строка превращается в массив для удобства дальнейшего присвоения.
    var values = ValueString.split(' ' , 3);
    var taskId = values[0];
    var id = values[1];
    var userId = values[2];



    // var OneDay = values[3];
    // var TwoDay = values[4];
    // //var string_x = values[5];
    // //var string_w = values[6];
    // var string_y = values[7];
    // var string_h = values[8];
    // var rgb = values[9];

  //   var valueName = LastValue;
  //   var name = valueName;

  //   //var x = Number.parseInt(string_x);
  //   //var w = Number.parseInt(string_w);
  //   var y = Number.parseInt(string_y);
  //   var h = Number.parseInt(string_h);


  //   //Тут ведуться вычесления количества затраченых на задачу дней.
  //   var dateOn = OneDay.split('-');
  //   var dateTw = TwoDay.split('-');
  //   var startDate = new Date(dateOn[0] ,  dateOn[1] - 1, dateOn[2]);
  //   var endDate = new Date(dateTw[0] ,  dateTw[1] - 1, dateTw[2]);
  //   var resultDate =  ((endDate - startDate)/ 1000 / 60 / 60 / 24) + 1;
  //   var w = ((resultDate * 21));


  //   //Тут ведеться расчет координат по х.
  //   var StartDate = new Date(2018,0,1); 
  //   var dateX = ((startDate - StartDate)/ 1000 / 60 / 60 / 24);
  //   var x = dateX * 21;

  //   // console.log("dateOne: ", dateOne);
  //   // console.log("endDate: ", endDate);
  //   // console.log("StartDate: ", StartDate);
  //   // console.log("resultDate: ", resultDate);
  //   // console.log("valueName: ", valueName);
  //   //console.log("dateX: ", dateX);
  //   // console.log("values" , values);
  

   await this.projectModel.findOneAndUpdateTaskInUsers(id , userId , taskId );
   return true;
  }
}
module.exports = CreateTask;

