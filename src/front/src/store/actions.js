import api from '../api';

const loadStatus = ({ commit }) => {
  api.request('get', 'status/', null, 2500)
    .then(response => {
      commit('STATUS_LOADED', response.data);
    });
};

const loadProjects = ({ commit }) => {
  api.getData('get', 'projects/')
    .then(data => {
       //console.log('data',data )
      commit('LOADED_PROJECTS', data);
    })
    api.getData('get', 'projects/join_users')
    .then(data => {
      commit('JOIN_USERS_TO_PROJECTS', data);
    });
};

const openProject = ({ commit }, id) => {
  api.getData('get', `projects/${id}`)
    .then(data => {
      commit('OPENED_PROJECT', data);
    });
};

const addProject = ({ commit }, data) => {
  api.request('post', 'projects/', data)
    .then(
      commit('ADDED_PROJECT', data));
};

const deleteProject = ({ commit }, id) => {
  api.request('delete', `projects/${id}`)
    .then(
      commit('DELETED_PROJECT', id));
};

const saveProject = ({ commit }, data) => {
  console.log('save', data);
  api.request('post', `projects/${data.id}`, data)
    .then(
      commit('SAVED_PROJECT', data)
    );
};

const addUserToProject = ({ commit }, data) => {
  console.log('save', data);
  api.request('post', `projects/${data.id}/add_user/${data.userId}`)
    .then(
      commit('SAVED_PROJECT', data)
    );
};

const loadUsers = ({ commit }) => {
  api.getData('get', 'users/')
    .then(data => {
      commit('LOADED_USERS', data);
    });
};

const openUser = ({ commit }, id) => {
  api.getData('get', `users/${id}`)
    .then(data => {
      commit('OPENED_USERS', data);
    });
};

const addUser = ({ commit }, data) => {
  api.request('post',  `users/`, data)
    .then(
      commit('ADDED_USER', data));
};

const deleteUser = ({ commit }, id) => {
  api.request('delete', `users/${id}`)
    .then(
      commit('DELETED_USER', id));
};

const saveUser = ({ commit }, data) => {
  api.request('post', `users/${data.id}`, data)
    .then(
      commit('SAVED_USER', data));
};

const addTaskToProject = ({ commit }, data) => {
  console.log('save', data);
  api.request('post', `projects/${data.id}/add_task/${data.taskId}`)
    .then(
      commit('SAVED_PROJECT', data)
    );
};

const loadTasks = ({ commit }) => {
  api.getData('get', 'tasks/')
    .then(data => {
      commit('LOADED_TASKS', data);
    });
};

const addTask = ({ commit }, data) => {
  api.request('post',  `tasks/`, data)
    .then(
      commit('ADDED_TASK', data));
};

const deleteTask = ({ commit }, id) => {
  api.request('delete', `tasks/${id}`)
    .then(
      commit('DELETED_TASK', id));
};

const saveTask = ({ commit }, data) => {
  api.request('post', `tasks/${data.id}`, data)
    .then(
      commit('SAVED_TASK', data));
};


export default {
  loadStatus,
  loadProjects,
  addProject,
  deleteProject,
  addUserToProject,
  openProject,
  saveProject,

  loadUsers,
  openUser,
  addUser,
  deleteUser,
  saveUser,

  addTaskToProject,
  loadTasks,
  addTask,
  deleteTask,
  saveTask,
};
