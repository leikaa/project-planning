'use strict';

class GetUsers {
  constructor({ logger, userModel }) {
    this.logger = logger;
    this.userModel = userModel;
  }

  async get(filter, projection) {
    // console.log('get', filter, projection);
    const result = await this.userModel.getList(filter, projection);
    //console.log('Это GetUsers result' , result)
    
    return result;
  }
}

module.exports = GetUsers;