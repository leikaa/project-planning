import api from '../api';

const loadStatus = ({commit}) => {
  api.request('get', 'status/', null, 2500)
    .then(response => {
      commit('STATUS_LOADED', response.data);
    });
};

const loadProjects = ({commit}) => {
  api.getData('get', 'projects/')
    .then(data => {
      //console.log('data',data )
      commit('LOADED_PROJECTS', data);
    })
};

const addProject = ({dispatch, commit}, data) => {
  api.request('post', 'projects/', data)
  setTimeout(() => {
    return dispatch("loadProjects")
    .then(
      commit('ADDED_PROJECT', data));
  }, 100)
};

const deleteProject = ({dispatch, commit}, id) => {
  api.request('delete', `projects/${id}`)
     return dispatch("loadProjects")
     .then(
        commit('DELETED_PROJECT', id));
};

const saveProject = ({dispatch, commit}, data) => {
  console.log('save', data);
  api.request('post', `projects/${data.id}`, data)
    return dispatch("loadProjects") 
    .then(
      commit('SAVED_PROJECT', data)
    );
};

const addUserToProject = ({dispatch,commit}, data) => {
  console.log('save', data);
  api.request('post', `projects/${data.id}/add_user/${data.userId}`)
    return dispatch("loadProjects")
    .then(
      commit('ADD_USER_TO_PROJECT', data)
  );
};

const deleteUserFromProject = ({dispatch, commit}, data) => {
  console.log('delete', data);
  api.request('delete', `projects/${data.id}/users/${data.userId}`)
    return dispatch("loadProjects")
    .then(
      commit('DELETE_USER_FROM_PROJECT', data)
    );
};

const loadUsers = ({commit}) => {
  api.getData('get', 'users/')
    .then(data => {
      commit('LOADED_USERS', data);
    });
};

const openUser = ({commit}, id) => {
  api.getData('get', `users/${id}`)
    .then(data => {
      commit('OPENED_USERS', data);
    });
};

const addUser = ({dispatch, commit}, data) => {
  api.request('post', `users/`, data)
  setTimeout(() => {
    return dispatch("loadUsers")
    .then(
      commit('ADDED_USER', data));
  } , 100)
};

const deleteUser = ({dispatch, commit}, id) => {
  api.request('delete', `users/${id}`)
    return dispatch("loadUsers")
    .then(
      commit('DELETED_USER', id));
};

const saveUser = ({dispatch, commit}, data) => {
  api.request('post', `users/${data.id}`, data)
    return dispatch("loadUsers")
    .then(
      commit('SAVED_USER', data));
};

const loadTasks = ({commit}) => {
  api.getData('get', 'tasks/')
    .then(data => {
      commit('LOADED_TASKS', data);
    });
};

const addTask = ({dispatch, commit}, data) => {
  api.request('post', `tasks/`, data)
    return (dispatch("loadTasks") && dispatch("loadProjects"))
    .then(
      commit('ADDED_TASK', data));
};

const deleteTaskFromProject = ({dispatch, commit}, data) => {
  console.log('delete', data);
  // api.request('delete', `projects/${data.id}/task/${data.taskId}`)
  //    .then(
  //     commit('DELETE_TASK_FROM_PROJECT', data)
  //   );
  api.request('delete', `task/${data.taskId}`)
    return dispatch("loadTasks")
    .then(
      commit('DELETED_TASK', data)
  );
};

const saveTaskFromProject = ({dispatch, commit}, data) => {
  api.request('post', `tasks/${data.id}`, data)
    return (dispatch("loadTasks") && dispatch("loadProjects"))
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
  deleteUserFromProject,

  loadUsers,
  openUser,
  addUser,
  deleteUser,
  saveUser,

  loadTasks,
  addTask,
  deleteTaskFromProject,
  saveTaskFromProject,
};