/* eslint-disable no-console */
const Model = require('./Model');

class UserModel extends Model {
  constructor({ db }) {
    super({ db, collectionName: 'user' });
  }

  // Добавление задачи в коллекцию user.
  async addTaskToUser(id, taskId) {
    // console.log('addTaskToProject', id , taskId );
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id),
        },
        {
          $push: { task: { taskId: this.db.objectId(taskId) } },
        },
      )
      .catch((err) => {
        console.error(err);
      });
      // console.log("Результат добавления задача в проект",result);
    return result;
  }

  // Удаление задачи из проекта.
  async deleteTaskFromUser(id, taskId) {
    // console.log('deleteTaskFromProject', id, taskId);
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id),
        },
        {
          $pull: {
            task: { taskId: this.db.objectId(taskId) },
          },
        },
      )
      .catch((err) => {
        console.error(err);
      });
    console.log(result);
    return result;
  }

  // Соеденение коллекции участников и задач.
  // async JoinUserAndTaskList() {
  //   const result = await this.db.get()
  //   .collection(this.collectionName)
  //   .aggregate([
  //     {
  //       $lookup:
  //       {
  //         from: "TaskList",
  //         localField: "task.taskId",
  //         foreignField: "_id",
  //         as: "task"
  //       }
  //     }
  //   ]).toArray()
  //   .catch(err => {
  //     console.error(err);
  //   });
  //   return result
  // }
}

module.exports = UserModel;
