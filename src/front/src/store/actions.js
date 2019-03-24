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
      commit('JOINING_USERS_TO_PROJECTS', data);
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
      commit('ADD_USER_TO_PROJECT', data)
    );
};

const deleteUserOnProject = ({ commit }, data) => {
  console.log('delete', data);
  api.request('post', `projects/${data.id}/del_user/${data.userId}`)
    .then(
      commit('DELETE_USER_ON_PROJECT', data)
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

     api.getData('get', 'projects/join_users')
      .then(data => {
      commit('JOINING_USERS_TO_PROJECTS', data);
    });
};

const deleteTaskOnProject = ({ commit }, data) => {
  console.log('delete', data);
  api.request('post', `projects/${data.id}/del_task/${data.taskId}`)
    .then(
      commit('DELETE_TASK_ON_PROJECT', data)
    );

  api.request('delete', `task/${data.taskId}`)
    .then(
      commit('DELETED_TASK', data)
    );

  api.getData('get', 'projects/join_users')
    .then(data => {
    commit('JOINING_USERS_TO_PROJECTS', data);
  });
};

const joinUsers = ({ commit }, data) => {
  api.getData('get', 'projects/join_users')
  .then(data => {
   commit('JOINING_USERS_TO_PROJECTS', data);
  });
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
  saveProject,
  addUserToProject,
  deleteUserOnProject,

  loadUsers,
  openUser,
  addUser,
  deleteUser,
  saveUser,

  loadTasks,
  addTask,
  deleteTaskOnProject,
  joinUsers,
  saveTask,
};
