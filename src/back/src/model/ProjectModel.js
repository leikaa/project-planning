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
      /*{
          $addToSet: { userId: this.db.objectId(userId) } // $addToSet
        },
      */
      )
      .catch(err => {
        console.log(err);
      });
      //console.log(result);
    return result;
  }



  async JoinProjectAndUser(filter , projection){
    const result = await this.db.get()
    .collection(this.collectionName)
    .aggregate([
      { "$unwind": "$users" },
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
    console.log("Это агрегации", result)
    const test = await this.find(filter, projection).toArray();
    console.log("test", test);
    return result || test;
  }






/* 
  async insertOneTask(ParseAnswerOnCommand) {
    const test = await this.db.get()
      .collection(this.collectionName)
      .insertOne(ParseAnswerOnCommand);
    return test;
  }
*/
}

module.exports = ProjectModel;
