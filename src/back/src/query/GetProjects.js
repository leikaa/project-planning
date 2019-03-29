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

    const usersMap = {};
    usersList.forEach(item => {
      usersMap[item._id] = item.name;
    });

    const result = projectList.map(item => {
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

    
    const taskMap = {};
    taskList.forEach(item => {
      taskMap[item._id] = item.name;
    });
    console.log("taskMap",taskMap)
  
    const obj = result.map(item =>{
      if (item.users === undefined) {
        return item;
      } 
        item.users.map(elem => {
          if (elem.task === undefined) {
            return elem;
           } 
            elem.task.map(el => {
              if (taskMap[el.taskId]) {
                el.name = taskMap[el.taskId];
              }
              //console.log('Это el ', el)
              return el
            });
         //console.log('Это elem ', elem)
          return elem;
        });
        return item
    })
    //console.log("Ты тут",obj)

    
    

    return obj;
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