'use strict';

class UpdateTask {
  constructor({
    logger,
    taskModel,
    projectModel,
  }) {
    this.logger = logger;
    this.taskModel = taskModel;
    this.projectModel = projectModel;
  }

  async execute(filter, update) {
    this.logger.debug('UpdateTask', filter , update);
    const id = update.id;
    delete(update.id);
    await this.taskModel.findOneAndUpdate(filter, update);
    update._id = id;
    return true;













    // const test = await this.taskModel.findOneAndUpdate(filter, update);
    // console.log("123" , test.value)


    // //Тут обьект превращается в строку.
    // var ValueString = ('');
    //   for(var item in test.value){
    //     if (test.value.hasOwnProperty(item)) {
    //       ValueString += test.value[item] + ' ';
    //      }
    //      console.log("Значение", test.value[item])
    //   };
    //    console.log("Значение ValueString", ValueString)


    //  //Тут строка превращается в массив для удобства дальнейшего присвоения.
    //    const values = ValueString.split(' ' , 10);
    //    let taskId = values[0];
    //    let _id = values[1];
    //    let userId = values[2];
    //    let string_x = values[5];
    //    let string_y = values[6];
    //    let string_w = values[7];
    //    let string_h = values[8];
    //    let rgb = values[9];
    //    values.splice(3, 2);
   
    //    let x = Number.parseInt(string_x);
    //    let w = Number.parseInt(string_w);
    //    let y = Number.parseInt(string_y);
    //    let h = Number.parseInt(string_h);

    //    console.log("x", x);
    //    console.log("w", w);
    //    console.log("y", y);
    //    console.log("h", h);
    //    console.log("values", values);

    //   //Получение пройденных дней от начала календанря.
    //   const NumberDaysFromStart = x / 21;

    //   //Получение секунд из пройденных дней.
    //   const NumberSecondsFromStart = NumberDaysFromStart * 24 * 60 * 60 * 1000;
      
    //   //Получение даты из секунд.
    //   const getFirstDay = new Date(NumberSecondsFromStart);
    //   const startDate = [getFirstDay.getFullYear() + 48, getFirstDay.getMonth() + 1, getFirstDay.getDate()].join('-');
    //   console.log("startDate",startDate);

    //   //Длительность задачи.
    //   const TaskDuration = w / 21;
    //   console.log("TaskDuration",TaskDuration);

    //   const getDateOne = new Date(startDate);
    //   console.log("getDateOne", getDateOne);
      
    //   const getDurationDate = getDateOne.setDate(getFirstDay.getDate() + TaskDuration);
    //   console.log("getDurationDate", getDurationDate);

    //   const getSecondDay = new Date(getDurationDate);
    //   console.log("getSecondDay", getSecondDay);

    //   const endDate = [getSecondDay.getFullYear() , getSecondDay.getMonth() + 1 , getSecondDay.getDate() - 1].join('-');
    //   console.log("EndDate", endDate);

    //   await this.projectModel.UpdateTask(_id , userId , taskId , startDate , endDate , x , y , w , h , rgb);
  }
}

module.exports = UpdateTask;