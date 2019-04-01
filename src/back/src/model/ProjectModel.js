'use strict';

const Model = require('./Model');

class ProjectModel extends Model {
  constructor({ db }) {
    super({ db, collectionName: 'Projects' })
  }

  //Добавление участников в проект.
  async findOneAndUpdateUserInProject(id, userId) {
    //console.log('findOneAndUpdateUserInProject', id, userId );
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id)   
        },
        {
         $addToSet: {users: { userId: this.db.objectId(userId) , task: [] } ,
        },
        },
        )
      .catch(err => {
        console.log(err);
      });
    return result;
  }

  //Сортирует участников в проекте.
  async sortUserInProject(id, userId) {
    //console.log('sortUserInProject', id, userId );
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id)   
        },
        { 
          $push : {"users":{$each:[],$sort: 1}}
        }
        )
    return result;
  }

  //Удаление участников из проекта.
  async findOneAndUpdateUserDelProject(id, userId) {
    console.log('findOneAndUpdateUserInProject', id, userId);
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id)
        },
        {
         $pull: {users: { userId: this.db.objectId(userId)} ,
        }
        },
      )
      .catch(err => {
        console.log(err);
      });
      console.log(result);
    return result;
  }

  //Добавление задачи в проект.
  async findOneAndUpdateTaskInUsers(id, userId, taskId) {
    console.log('findOneAndUpdateTaskInUsers', id, userId , taskId );
    const result = await this.db.get()
      .collection(this.collectionName) 
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id),
          'users.userId': this.db.objectId(userId),
        },
        {
          $push: { 'users.$.task': { taskId: this.db.objectId(taskId)}}
        },
      )
      .catch(err => {
        console.log(err);
      });
      console.log("Результат добавления задача в проект",result);
    return result;
  }


  //Удаление задачи из проекта.
  async findOneAndUpdateDeleteTask(id, taskId) {
    console.log('findOneAndUpdateUserInProject', id, taskId);
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id)
        },
        {
         $pull: {
           "users.$[].task" : { taskId: this.db.objectId(taskId)}
        }
        },
      )
      .catch(err => {
        console.log(err);
      });
      console.log(result);
    return result;
  }
}
module.exports = ProjectModel;
