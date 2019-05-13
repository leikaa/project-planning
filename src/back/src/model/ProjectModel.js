'use strict';

const Model = require('./Model');

class ProjectModel extends Model {
  constructor({ db }) {
    super({ db, collectionName: 'Projects' })
  }

  //Добавление участников в проект.
  async addUserToProject(id, userId) {
    //console.log('addUserToProject', id, userId );
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id)   
        },
        {
         $addToSet: {users: { userId: this.db.objectId(userId) /*, task: []*/ } ,
        },
        },
        )
      .catch(err => {
        console.error(err);
      });
      console.log(result);
    return result;
  }

  //Сортировка участников в проекте.
  async sortUsersToProject(id) {
    //console.log('sortUserInProject', id);
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
      .catch(err => {
        console.error(err);
      });
      console.log(result);
    return result;
  }

  //Удаление участников из проекта.
  async deleteUserFromProject(id, userId) {
    //console.log('deleteUserFromProject', id, userId);
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
        console.error(err);
      });
      console.log(result);
    return result;
  }

  //Соеденение коллекции проектов и участников
  async JoinProjectAndUser() {
    const result = await this.db.get()
    .collection(this.collectionName)
    .aggregate([
      {
        $lookup:
        {
          from: "user",
          localField: "users.userId",
          foreignField: "_id",
          as: "users"
        }
      }
    ]).toArray();
    return result
  }

}
module.exports = ProjectModel;
