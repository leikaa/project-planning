'use strict';

const Model = require('./Model')

class ProjectModel extends Model {
  constructor({ db }) {
    super({ db, collectionName: 'ProjectsMenu' })
  }

  async findOneAndUpdateUserInProject(id, userId) {
    //console.log('findOneAndUpdateUserInProject', id, userId);
    const result = await this.db.get()
      .collection(this.collectionName)
      .findOneAndUpdate(
        {
          _id: this.db.objectId(id)
        },
        {
         $addToSet: {users: { userId: this.db.objectId(userId) , task: []} }
        },
       /*{
          $addToSet: { userId: this.db.objectId(userId) } // $addToSet
        },*/
      )
      .catch(err => {
        console.log(err);
      });
      //console.log(result);
    return result;
  }
}

module.exports = ProjectModel;
