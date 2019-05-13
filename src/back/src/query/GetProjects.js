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

  async joinProjectAndUser(){
    const projectList = await this.projectModel.getList();
    const usersList = await this.userModel.getList();

    const joinProjectAndUser = await this.projectModel.JoinProjectAndUser();

    //Старая рабочая функция!
    // const usersNameMap = {};
    // usersList.forEach(item => {
    //   usersNameMap[item._id] = item.name;
    // });

    // const usersTaskMap = {};
    // usersList.forEach(item => {
    //   usersTaskMap[item._id] = item.task;
    // });

    // const joinProjectAndUser = projectList.map(item => {
    //   if (item.users === undefined) {
    //     return item;
    //   }
    //   item.users.map(elem => {
    //     if (usersNameMap[elem.userId]) {
    //       elem.name = usersNameMap[elem.userId];
    //       elem.task = usersTaskMap[elem.userId]
    //     }
    //     //console.log('Это старый js elem ', elem)
    //     return elem;
    //   });
    //   //console.log('Это item ', item)
    //   return item;
    // });

    return joinProjectAndUser
  }


  

  async get() {
    const taskList = await this.taskModel.getList();
    const joinProjectAndUser = await this.joinProjectAndUser();

    const joinUserAndTaskList = await this.userModel.JoinUserAndTaskList();
    
  
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

    const taskUserId = {};
    taskList.forEach(item => {
      taskUserId[item._id] = item.userId;
    });

    const taskProjectId = {};
    taskList.forEach(item => {
      taskProjectId[item._id] = item.projectId;
    });


    // Обновление свойств объектов в массиве users.
    const result = joinProjectAndUser.map(item => {
      if (item.users === undefined) {
        return item;
      }
      item.users.map(elem => {
        if(elem.task){
          elem.task.map(el => {
            if(taskMapRgb[el.taskId]){
              el.name = taskMapName[el.taskId];
              el.userId = taskUserId[el.taskId];
              el.projectId = taskProjectId[el.taskId];
              el.rgb = taskMapRgb[el.taskId];
              el.startDate = taskMapStartDate[el.taskId];
              el.endDate = taskMapEndDate[el.taskId];
              el.y = taskMapY[el.taskId];
            }
            //console.log("ELEM",elem)
          return el  
          })
        }
        return elem;
      });
      return item;
    });
    return result
  }





  

  // async getProjectList() {
  //   const projectList = await this.projectModel.getList();
  //   return projectList;
  // };

  // async getUserList() {
  //   const usersList = await this.userModel.getList();
  //   return usersList;
  // }

  // async getTaskList() {
  //   const taskList = await this.taskModel.getList();
  //   return taskList;
  // };

  // async usersNameMap() {
  //   const usersList = await this.getUserList();
  //   const usersNameMap = {};
  //   usersList.forEach(item => {
  //     usersNameMap[item._id] = item.name;
  //   });
  //   return usersNameMap
  // };

  // async usersTaskMap() {
  //   const usersList = await this.getUserList();
  //   const usersTaskMap = {};
  //   usersList.forEach(item => {
  //     usersTaskMap[item._id] = item.task;
  //   });
  //   return usersTaskMap
  // };

  // async taskMapName() {
  //   const taskList = await this.getTaskList();
  //   const taskMapName = {};
  //   taskList.forEach(item => {
  //     taskMapName[item._id] = item.name;
  //   });
  //   return taskMapName
  // };

  // async taskMapRgb() {
  //   const taskList = await this.getTaskList();
  //   const taskMapRgb = {};
  //   taskList.forEach(item => {
  //     taskMapRgb[item._id] = item.rgb;
  //   });
  //   return taskMapRgb
  // };

  // async taskMapStartDate() {
  //   const taskList = await this.getTaskList();
  //   const taskMapStartDate = {};
  //   taskList.forEach(item => {
  //     taskMapStartDate[item._id] = item.startDate;
  //   });
  //   return taskMapStartDate
  // };

  // async taskMapEndDate() {
  //   const taskList = await this.getTaskList();
  //   const taskMapEndDate = {};
  //   taskList.forEach(item => {
  //     taskMapEndDate[item._id] = item.endDate;
  //   });
  //   return taskMapEndDate
  // };

  // async taskMapY() {
  //   const taskList = await this.getTaskList();
  //   const taskMapY = {};
  //   taskList.forEach(item => {
  //     item.y = Number.parseInt(item.y)
  //     taskMapY[item._id] = item.y;
  //   });
  //   return taskMapY
  // };

  // async taskUserId() {
  //   const taskList = await this.getTaskList();
  //   const taskUserId = {};
  //   taskList.forEach(item => {
  //     taskUserId[item._id] = item.userId;
  //   });
  //   return taskUserId
  // };


  // async taskProjectId() {
  //   const taskList = await this.getTaskList();
  //   const taskProjectId = {};
  //   taskList.forEach(item => {
  //     taskProjectId[item._id] = item.projectId;
  //   });
  //   return taskProjectId
  // };

  // async get() {
  //   const projectList = await this.getProjectList();
  //   const usersNameMap = await this.usersNameMap();
  //   const usersTaskMap = await this.usersTaskMap();
  //   const taskMapName = await this.taskMapName();
  //   const taskMapRgb = await this.taskMapRgb();
  //   const taskMapStartDate = await this.taskMapStartDate();
  //   const taskMapEndDate = await this.taskMapEndDate();
  //   const taskMapY = await this.taskMapY();
  //   const taskUserId = await this.taskUserId();
  //   const taskProjectId = await this.taskProjectId();
   
  //   //Обновление свойств объектов в массиве users.
  //   const result = projectList.map(item => {
  //     if (item.users === undefined) {
  //       return item;
  //     }
  //     item.users.map(elem => {
  //       if (usersNameMap) {
  //         elem.name = usersNameMap;
  //         elem.task = usersTaskMap;
  //         elem.task.map(el => {
  //           if (taskMapRgb) {
  //             el.name = taskMapName;
  //             el.userId = taskUserId;
  //             el.projectId = taskProjectId;
  //             el.rgb = taskMapRgb;
  //             el.startDate = taskMapStartDate;
  //             el.endDate = taskMapEndDate;
  //             el.y = taskMapY;
  //           }
  //           //console.log('Это el ', el)
  //           return el
  //         })
  //       }
  //       //console.log('Это elem ', elem)
  //       return elem;
  //     });
  //     //console.log('Это item ', item)
  //     return item;
  //   });
  //   return result
  // }








  // async get() {
  //   // const projectList = await this.projectModel.getList();
  //   // const usersList = await this.userModel.getList();
  //   // const taskList = await this.taskModel.getList();

  //   //  //Создание обьекта с key = id , value = name.
  //   // const taskMapName = {};
  //   // taskList.forEach(item => {
  //   //   taskMapName[item._id] = item.name;
  //   // });

  //   // const taskMapRgb = {};
  //   // taskList.forEach(item => {
  //   //   taskMapRgb[item._id] = item.rgb;
  //   // });

  //   // const taskMapStartDate = {};
  //   // taskList.forEach(item => {
  //   //   taskMapStartDate[item._id] = item.startDate;
  //   // });

  //   // const taskMapEndDate = {};
  //   // taskList.forEach(item => {
  //   //   taskMapEndDate[item._id] = item.endDate;
  //   // });

  //   // const taskMapY = {};
  //   // taskList.forEach(item => {
  //   //   item.y = Number.parseInt(item.y)
  //   //   taskMapY[item._id] = item.y;
  //   // });

  //   // //Обновление свойств объектов в массиве task.
  //   // const result = JoinUsersAndProject.map(item =>{
  //   //   if (item.users === undefined) {
  //   //     return item;
  //   //   } 
  //   //     item.users.map(elem => {
  //   //       if (elem.task === undefined) {
  //   //         return elem;
  //   //        } 
  //   //         elem.task.map(el => {
  //   //           if (taskMapName[el.taskId]) {
  //   //             el.name = taskMapName[el.taskId];
  //   //             el.rgb = taskMapRgb[el.taskId];
  //   //             el.startDate = taskMapStartDate[el.taskId];
  //   //             el.endDate = taskMapEndDate[el.taskId];
  //   //             el.y = taskMapY[el.taskId];
  //   //           }
  //   //           //console.log('Это el ', el)
  //   //           return el
  //   //         });
  //   //      //console.log('Это elem ', elem)
  //   //       return elem;
  //   //     });
  //   //     return item
  //   // })
  //   // //console.log("Ты тут",result)
  //   // return result;
  // }
}

module.exports = GetProjects;