/* eslint-disable no-console */
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
    const getProjects = await this.getProjects.get();
    return getProjects;
  }

  async addUsers(id, userId) {
    try {
      return await this.addUser.execute(id, userId);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async deleteUserFromProject(id, userId) {
    try {
      return await this.removeUserFromProject.execute(id, userId);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async create(params) {
    try {
      return await this.createProject.execute(params);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async delete(params) {
    try {
      return await this.deleteProject.execute(params);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async update(filter, update) {
    try {
      return await this.updateProject.execute(filter, update);
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = ProjectController;
