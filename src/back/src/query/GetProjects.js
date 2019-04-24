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

  async getProjectList(){
    const projectList = await this.projectModel.getList();
    return  projectList;
  };

  async getUserList(){
    const usersList = await this.userModel.getList();
    return usersList;
  }

  async getTaskList(){
    const taskList = await this.taskModel.getList();
    return  taskList;
  };


  async JoinUsersAndProject() {
    const projectList = await this.getProjectList();
    const usersList = await this.getUserList();
    const taskList = await this.getTaskList();

    const usersNameMap = {};
    usersList.forEach(item => {
      usersNameMap[item._id] = item.name;
    });

    const taskMapName = {};
    taskList.forEach(item => {
      taskMapName[item._id] = item.name;
    });

    const usersTaskMap = {};
    usersList.forEach(item => {
      usersTaskMap[item._id] = item.task;
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

    const taskProjectId = {};
    taskList.forEach(item => {
      item.y = Number.parseInt(item.y)
      taskProjectId[item._id] = item.projectId;
    });
    //console.log("taskProjectId" , taskProjectId)

    //Обновление свойств объектов в массиве users.
    const JoinUsersAndProject = projectList.map(item => {
      if (item.users === undefined) {
        return item;
      }
      item.users.map(elem => {
        if (usersNameMap[elem.userId]) {
          elem.name = usersNameMap[elem.userId];
          elem.task = usersTaskMap[elem.userId]
          elem.task.map(el => {
            if(taskMapRgb[el.taskId]){
              el.name = taskMapName[el.taskId];
              el.projectId = taskProjectId[el.taskId];
              el.rgb = taskMapRgb[el.taskId];
              el.startDate = taskMapStartDate[el.taskId];
              el.endDate = taskMapEndDate[el.taskId];
              el.y = taskMapY[el.taskId];
            }
            //console.log('Это el ', el)
          return el  
          })
        }
        //console.log('Это elem ', elem)
        return elem;
      });
      //console.log('Это item ', item)
      return item;
    });
    return JoinUsersAndProject
  }





  async get() {
    // const projectList = await this.getProjectList();
    // const usersList = await this.getUserList();
    // const taskList = await this.getTaskList();
    




    const projectList = await this.projectModel.getList();
    const usersList = await this.userModel.getList();
    const taskList = await this.taskModel.getList();

  
    const JoinUsersAndProject = await this.JoinUsersAndProject();
    return  JoinUsersAndProject

    //  //Создание обьекта с key = id , value = name.
    // const taskMapName = {};
    // taskList.forEach(item => {
    //   taskMapName[item._id] = item.name;
    // });

    // const taskMapRgb = {};
    // taskList.forEach(item => {
    //   taskMapRgb[item._id] = item.rgb;
    // });

    // const taskMapStartDate = {};
    // taskList.forEach(item => {
    //   taskMapStartDate[item._id] = item.startDate;
    // });

    // const taskMapEndDate = {};
    // taskList.forEach(item => {
    //   taskMapEndDate[item._id] = item.endDate;
    // });

    // const taskMapY = {};
    // taskList.forEach(item => {
    //   item.y = Number.parseInt(item.y)
    //   taskMapY[item._id] = item.y;
    // });

    // //Обновление свойств объектов в массиве task.
    // const result = JoinUsersAndProject.map(item =>{
    //   if (item.users === undefined) {
    //     return item;
    //   } 
    //     item.users.map(elem => {
    //       if (elem.task === undefined) {
    //         return elem;
    //        } 
    //         elem.task.map(el => {
    //           if (taskMapName[el.taskId]) {
    //             el.name = taskMapName[el.taskId];
    //             el.rgb = taskMapRgb[el.taskId];
    //             el.startDate = taskMapStartDate[el.taskId];
    //             el.endDate = taskMapEndDate[el.taskId];
    //             el.y = taskMapY[el.taskId];
    //           }
    //           //console.log('Это el ', el)
    //           return el
    //         });
    //      //console.log('Это elem ', elem)
    //       return elem;
    //     });
    //     return item
    // })
    // //console.log("Ты тут",result)
    // return result;
  }
}

module.exports = GetProjects;