'use strict';

const Model = require('./Model')

class ProjectModel extends Model {
  constructor({ db }) {
    super({ db, collectionName: 'Projects' })
  }

  //Добавление участников в проект.
  async findOneAndUpdateUserInProject(id, userId) {
    console.log('findOneAndUpdateUserInProject', id, userId );
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id)
        },
        {
         $addToSet: {users: { userId: this.db.objectId(userId), task: []} ,
         userId: this.db.objectId(userId) 
        }
        },
      )
      .catch(err => {
        console.log(err);
      });
    return result;
  }
  
  //Добавление задачи в проект.
  async findOneAndUpdateTaskInUsers(id , userId , taskId , x , y , w , h , rgb) {
    console.log('findOneAndUpdateTaskInUsers', id, userId , taskId);
    const result = await this.db.get()
      .collection(this.collectionName) 
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id),
          'users.userId': this.db.objectId(userId),
        },
        {
          $push: { 'users.$.task': { taskId: this.db.objectId(taskId) , x , y , w , h , rgb}}
        },
      )
      .catch(err => {
        console.log(err);
      });
      //console.log("Результат добавления задача в проект",result);
    return result;
  }

  async JoinningUsersToProjects(){
    const result = await this.db.get()
    .collection(this.collectionName)
    .aggregate([
      //{ "$unwind": "$users" },
      {
        $lookup:
        {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
    ]).toArray();
     //console.log("Результат агрегации", result)
    return result;
  }

  async JoiningUserTasksToProjects(){
    const result = await this.db.get()
    .collection(this.collectionName)
    .aggregate([
      {
        $lookup:
        {
          from: "TaskList",
          localField: "users.task.taskId",
          foreignField: "_id",
          as: "TaskList"
        }
      },
    ]).toArray();
     //console.log("Результат агрегации", result)
    return result;
  }
}

module.exports = ProjectModel;
