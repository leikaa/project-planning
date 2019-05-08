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
      commit('LOADED_PROJECTS', data);
    })
    .catch(error => {
      commit('SET_ERROR', error);
    });
};

const addProject = ({dispatch, commit}, data) => {
  api.request('post', 'projects/', data)
    .then( res =>{
      if(res.status == 200){
        commit('ADDED_PROJECT', data),
        dispatch("loadProjects")
      }
    }
  );
};

const deleteProject = ({dispatch, commit}, id) => {
  api.request('delete', `projects/${id}`)
    .then( res =>{
      if(res.status == 200){
        commit('DELETED_PROJECT', id),
        dispatch("loadProjects")
      }
    }
  );
};

const saveProject = ({dispatch, commit}, data) => {
  console.log('save', data);
  api.request('post', `projects/${data.id}`, data)
    .then( res =>{
      if(res.status == 200){
        commit('SAVED_PROJECT', data),
        dispatch("loadProjects")
      }
    }
  );
};

const addUserToProject = ({dispatch,commit}, data) => {
  console.log('addUserToProject', data);
  api.request('post', `projects/${data.id}/add_user/${data.userId}`)
    .then( res =>{
      if(res.status == 200){
        commit('ADD_USER_TO_PROJECT', data),
        dispatch("loadProjects")
      }
    }
  );
};

const deleteUserFromProject = ({dispatch, commit}, data) => {
  console.log('delete', data);
  api.request('delete', `projects/${data.id}/users/${data.userId}`)
    .then( res =>{
      if(res.status == 200){
        commit('DELETE_USER_FROM_PROJECT', data),
        dispatch("loadProjects")
      }
    }
  );
};

const loadUsers = ({commit}) => {
  api.getData('get', 'users/')
    .then(data => {
      commit('LOADED_USERS', data);
    })
    .catch(error => {
      commit('SET_ERROR', error);
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
    .then( res =>{
      if(res.status == 200){
        commit('ADDED_USER', data),
        dispatch("loadUsers")
      }
    }
  );
};

const deleteUser = ({dispatch, commit}, id) => {
  api.request('delete', `users/${id}`)
    .then( res =>{
      if(res.status == 200){
        commit('DELETED_USER', id),
        dispatch("loadUsers")
      }
    }
  );
};

const saveUser = ({dispatch, commit}, data) => {
  api.request('post', `users/${data.id}`, data)
    .then( res =>{
      if(res.status == 200){
        commit('SAVED_USER', data),
        dispatch("loadUsers")
      }
    }
  );
};

const loadTasks = ({commit}) => {
  api.getData('get', 'tasks/')
    .then(data => {
      commit('LOADED_TASKS', data);
    })
    .catch(error => {
      commit('SET_ERROR', error);
    });
};

const addTask = ({dispatch, commit}, data) => {
  api.request('post', `tasks/`, data)
    .then( res =>{
      if(res.status == 200){
        console.log(res)
        commit('ADDED_TASK', data),
        dispatch("loadTasks"),
        dispatch("loadProjects")
      } 
    }
  );
};

const deleteTaskFromUser = ({dispatch, commit}, data) => {
  if(data.id == "") {
    api.request('delete', `task/${data.taskId}`)
        .then( res =>{
          if(res.status == 200){
            commit('DELETED_TASK', data),
            dispatch("loadTasks")
          }
        }
      );
  }else {
    console.log('delete', data);
    api.request('delete', `users/${data.id}/task/${data.taskId}`)
      .then( res =>{
        if(res.status == 200){
          commit('DELETE_TASK_FROM_PROJECT', data),
          dispatch("loadProjects")
        }
      }
    );
    api.request('delete', `task/${data.taskId}`)
      .then( res =>{
        if(res.status == 200){
          commit('DELETED_TASK', data),
          dispatch("loadTasks")
        }
      }
    );
  } 
};

const saveTaskToProject = ({dispatch, commit}, data) => {
  api.request('post', `tasks/${data.id}`, data)
    .then( res =>{
      if(res.status == 200){
        commit('SAVED_TASK', data),
        dispatch("loadTasks"),
        dispatch("loadProjects")
      }
    }
  );
};

//Рефакторить
const saveTaskListToUser = ({dispatch, commit}, data) => {
  if(data.userId == "" || data.userId == data.oldUserId){
    api.request('post', `tasks/${data.id}`, data)
      .then( res =>{
        if(res.status == 200){
          commit('SAVED_TASK', data),
          dispatch("loadTasks"),
          dispatch("loadProjects")
        }
      }
    );
  }else if(data.oldUserId == ""){
    api.request('post', `tasks/${data.id}`, data)
    .then( res =>{
      if(res.status == 200){
        commit('SAVED_TASK', data),
        dispatch("loadTasks"),
        dispatch("loadProjects")
      }
    })

    api.request('post', `users/${data.userId}/add_task/${data.id}`)
    .then( res =>{
      if(res.status == 200){
        commit('ADD_TASK_TO_USER', data),
        dispatch("loadProjects")
      }
    })
  }else {
    api.request('post', `tasks/${data.id}`, data)
      .then( res =>{
        if(res.status == 200){
          commit('SAVED_TASK', data),
          dispatch("loadTasks"),
          dispatch("loadProjects")
        }
      })

    api.request('delete', `users/${data.oldUserId}/task/${ data.id}`)
      .then( res =>{
        if(res.status == 200){
          commit('DELETE_TASK_FROM_PROJECT', data),
          dispatch("loadProjects")
        }
      })

    api.request('post', `users/${data.userId}/add_task/${data.id}`)
    .then( res =>{
      if(res.status == 200){
        commit('ADD_TASK_TO_USER', data),
        dispatch("loadProjects")
      }
    })
  } 
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
  deleteTaskFromUser,
  saveTaskToProject,
  saveTaskListToUser,
};