class ProjectController {
  constructor({
    getProjects,
    addUser,
    removeUserFromProject,
    createProject,
    deleteProject,
    updateProject,
    logger,
  }) {
    this.getProjects = getProjects;
    this.addUser = addUser;
    this.removeUserFromProject = removeUserFromProject;
    this.createProject = createProject;
    this.deleteProject = deleteProject;
    this.updateProject = updateProject;
    this.logger = logger;
  }

  async getList() {
    return await this.getProjects.get();
  }

  async addUsers(id, userId) {
    return await this.addUser.execute(id, userId);
  }

  async deleteUserFromProject(id, userId) {
    return await this.removeUserFromProject.execute(id, userId);
  }

  async create(params) {
    return await this.createProject.execute(params);
  }

  async delete(params) {
    return await this.deleteProject.execute(params);
  }

  async update(filter, update) {
    return await this.updateProject.execute(filter, update);
  }
}

module.exports = ProjectController;
