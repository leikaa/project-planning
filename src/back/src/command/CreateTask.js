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
      console.log("Последняя добавленая задача" , answerOnCommand);
    


    //Тут полученый массив превращаеться в обьект.
    const ParseAnswerOnCommand = answerOnCommand.reduce(function(obj , item){
      for(var i=0 ; i < 10; i++){
        var key = Object.keys(item)[i];
        obj[key] = item[key];
      }
      return obj;
    }, {});
      console.log("Переменная ParseAnswerOnCommand!" , ParseAnswerOnCommand);



    //Тут обьект превращаеться в строку.
    var str = ('');
    var strName = ('');
      for(var item in ParseAnswerOnCommand){
        if (ParseAnswerOnCommand.hasOwnProperty(item)) {
          str += ParseAnswerOnCommand[item] + ' ';
          strName = ParseAnswerOnCommand[item] + ' ';
         }
          console.log("Значение", ParseAnswerOnCommand[item])
      };
       console.log("Значение str", str)
  

    //Тут строка превращаеться в массив
    var values = str.split(' ' , 8);
    var taskId = values[0];
    var id = values[1];
    var userId = values[2];
    var OneDay = values[3];
    var TwoDay = values[4];
    //var string_x = values[5];
    //var string_w = values[6];
    var string_y = values[5];
    var string_h = values[6];
    var rgb = values[7];

    var valueName = strName;
    var name = valueName;

    //var x = Number.parseInt(string_x);
    //var w = Number.parseInt(string_w);
    var y = Number.parseInt(string_y);
    var h = Number.parseInt(string_h);


    //Тут ведуться вычесления количества затраченых на задачу дней.
    var dateOn = OneDay.split('-');
    var dateTw = TwoDay.split('-');
    var dateOne = new Date(dateOn[0] ,  dateOn[1] - 1, dateOn[2]);
    var dateTwo = new Date(dateTw[0] ,  dateTw[1] - 1, dateTw[2]);
    var resultDate =  ((dateTwo - dateOne)/ 1000 / 60 / 60 / 24);
    var w = ((resultDate * 21));


    //Тут ведеться расчет координат по х.
    var StartDate = new Date(2018,0,1); //Начальная дата
    var dateX = ((dateOne - StartDate)/ 1000 / 60 / 60 / 24);
    var x = dateX * 21;

    console.log("dateOne: ", dateOne);
    console.log("dateTwo: ", dateTwo);
    console.log("StartDate: ", StartDate);
    console.log("resultDate: ", resultDate);
    console.log("valueName: ", valueName);
    console.log("dateX: ", dateX);
    console.log("values" , values);
  

    const addTaskOnProject = await this.projectModel.findOneAndUpdateTaskInUsers(id , userId , taskId , dateOne , dateTwo , x , y , w , h , rgb, name );
      //console.log(addTaskOnProject , "Ответ с model");
    return true;
  }
}
module.exports = CreateTask;

