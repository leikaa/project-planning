'use strict';

class GetProjects {
  constructor({
    logger,
    projectModel,
    userModel,
    taskModel
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
    this.userModel = userModel;
    this.taskModel = taskModel;
  }

  async get(filter, projection) {

    const projectList = await this.projectModel.getList(filter, projection);

    const usersList = await this.userModel.getList(filter, projection);

    const taskList = await this.taskModel.getList(filter, projection);

    //Создание обьекта с key = id , value = name.
    const usersMap = {};
    usersList.forEach(item => {
      usersMap[item._id] = item.name;
    });

    //Создание новоего масива с обновлеными обьектами.
    const JoinUsersAndProject = projectList.map(item => {
      if (item.users === undefined) {
        return item;
      } 
        item.users.map(elem => {
          if (usersMap[elem.userId]) {
            elem.name = usersMap[elem.userId];
          }
         //console.log('Это elem ', elem)
          return elem;
        });
      return item;
    });

     //Создание обьекта с key = id , value = name.
    const taskMapName = {};
    taskList.forEach(item => {
      taskMapName[item._id] = item.name;
    });

    //Создание обьекта с key = id , value = rgb.
    const taskMapRgb = {};
    taskList.forEach(item => {
      taskMapRgb[item._id] = item.rgb;
    });

    const taskMapStartDate = {};
    taskList.forEach(item => {
      taskMapStartDate[item._id] = item.startDate;
    });

    const taskMapEndDate = {};
    taskList.forEach(item => {
      taskMapEndDate[item._id] = item.endDate;
    });

    const result = JoinUsersAndProject.map(item =>{
      if (item.users === undefined) {
        return item;
      } 
        item.users.map(elem => {
          if (elem.task === undefined) {
            return elem;
           } 
            elem.task.map(el => {
              if (taskMapName[el.taskId]) {
                el.name = taskMapName[el.taskId];
                el.rgb = taskMapRgb[el.taskId];
                el.startDate = taskMapStartDate[el.taskId];
                el.endDate = taskMapEndDate[el.taskId];
              }
              //console.log('Это el ', el)
              return el
            });
         //console.log('Это elem ', elem)
          return elem;
        });
        return item
    })
    //console.log("Ты тут",result)
    return result;
  }






















  // const users = [{
  //   _id: 1, name: '1'
  // }, {
  //   _id: 2, name: '2'
  // }];
  // const usersMap = {};
  // users.forEach(item => {
  //   usersMap[item._id] = item.name;
  // });

  // result.users.map(item => {
  //   if (usersMap[item._id]) {
  //     item.name = usersMap[item._id];
  //   }
  // });

}

module.exports = GetProjects;