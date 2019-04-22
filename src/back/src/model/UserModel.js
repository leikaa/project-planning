'use strict';

const Model = require('./Model')

class UserModel extends Model {
  constructor({ db }) {
    super({ db, collectionName: 'user' })
  }



  //Добавление задачи в проект.
  async addTaskToProject(id, taskId) {
    console.log('addTaskToProject', id , taskId );
    const result = await this.db.get()
      .collection(this.collectionName) 
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id),
        },
        {
          $push: { task: { taskId: this.db.objectId(taskId)}}
        },
      )
      .catch(err => {
        console.log(err);
      });
      console.log("Результат добавления задача в проект",result);
    return result;
  }


  // //Удаление задачи из проекта.
  // async deleteTaskFromProject(id, taskId) {
  //   console.log('deleteTaskFromProject', id, taskId);
  //   const result = await this.db.get()
  //     .collection(this.collectionName)
  //     .findOneAndUpdate(
  //       {
  //         _id: this.db.objectId(id)
  //       },
  //       {
  //        $pull: {
  //          "users.$[].task" : { taskId: this.db.objectId(taskId)}
  //       }
  //       },
  //     )
  //     .catch(err => {
  //       console.log(err);
  //     });
  //     console.log(result);
  //   return result;
  // }
}

module.exports = UserModel;
