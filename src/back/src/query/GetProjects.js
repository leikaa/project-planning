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

    //Создание объекта с key = id , value = name для дальнейшего соединения.
    const usersMap = {};
    usersList.forEach(item => {
      usersMap[item._id] = item.name;
    });

    //Обновление свойств объектов в массиве users.
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

    const taskMapY = {};
    taskList.forEach(item => {
      item.y = Number.parseInt(item.y)
      taskMapY[item._id] = item.y;
    });

    //Обновление свойств объектов в массиве task.
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
                el.y = taskMapY[el.taskId];
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
}

module.exports = GetProjects;