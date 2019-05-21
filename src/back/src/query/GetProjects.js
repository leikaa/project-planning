class GetProjects {
  constructor({
    logger,
    projectModel,
    userModel,
    taskModel,
  }) {
    this.logger = logger;
    this.projectModel = projectModel;
    this.userModel = userModel;
    this.taskModel = taskModel;
  }

  async get() {
    const taskList = await this.taskModel.getList();
    const joinProjectAndUser = await this.projectModel.JoinProjectAndUser();

    // const joinUserAndTaskList = await this.userModel.JoinUserAndTaskList();

    const taskMapName = {};
    taskList.forEach((item) => {
      taskMapName[item._id] = item.name;
    });

    const taskMapRgb = {};
    taskList.forEach((item) => {
      taskMapRgb[item._id] = item.rgb;
    });

    const taskMapStartDate = {};
    taskList.forEach((item) => {
      taskMapStartDate[item._id] = item.startDate;
    });

    const taskMapEndDate = {};
    taskList.forEach((item) => {
      taskMapEndDate[item._id] = item.endDate;
    });

    const taskMapY = {};
    taskList.forEach((item) => {
      item.y = Number.parseInt(item.y);
      taskMapY[item._id] = item.y;
    });

    const taskUserId = {};
    taskList.forEach((item) => {
      taskUserId[item._id] = item.userId;
    });

    const taskProjectId = {};
    taskList.forEach((item) => {
      taskProjectId[item._id] = item.projectId;
    });

    // Обновление свойств объектов в массиве users.
    const result = joinProjectAndUser.map((item) => {
      if (item.users === undefined) {
        return item;
      }
      item.users.map((elem) => {
        if (elem.task) {
          elem.task.map((el) => {
            if (taskMapRgb[el.taskId]) {
              el.name = taskMapName[el.taskId];
              el.userId = taskUserId[el.taskId];
              el.projectId = taskProjectId[el.taskId];
              el.rgb = taskMapRgb[el.taskId];
              el.startDate = taskMapStartDate[el.taskId];
              el.endDate = taskMapEndDate[el.taskId];
              el.y = taskMapY[el.taskId];
            }
            // console.log("ELEM",elem)
            return el;
          });
        }
        return elem;
      });
      return item;
    });
    return result;
  }
}

module.exports = GetProjects;
