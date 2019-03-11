'use strict';

class GetProjects {
  constructor({ logger, projectModel }) {
    this.logger = logger;
    this.projectModel = projectModel;
  }

 
  async get(filter, projection) {
    //console.log('get', filter, projection);
    const result = await this.projectModel.getList(filter, projection);
    const res = await this.projectModel.JoinProjectAndUser();
   // console.log('Это GetProjects result' , result)
    console.log('Это GetProjects res' , res)
    return  result ;
  }

  async JoinProject(){
    const res = await this.projectModel.JoinProjectAndUser();
    return res ;
  }
}

module.exports = GetProjects;
