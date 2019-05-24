/* eslint-disable import/no-cycle */
import api from '../api';

const loadStatus = ({ commit }) => {
  api.request('get', 'status/', null, 2500)
    .then((response) => {
      commit('STATUS_LOADED', response.data);
    });
};

const loadProjects = ({ commit }) => {
  api.getData('get', 'projects/')
    .then((data) => {
      commit('LOADED_PROJECTS', data);
    })
    .catch((error) => {
      commit('SET_ERROR', error);
    });
};

const createProject = ({ dispatch }, data) => {
  api.request('post', 'projects/', data)
    .then((res) => {
      if (res.status === 200) {
        dispatch('loadProjects');
      }
    });
};

const deleteProject = ({ dispatch }, id) => {
  api.request('delete', `projects/${id}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch('loadProjects');
      }
    });
};

const saveProject = ({ dispatch }, data) => {
  // console.log('save', data);
  api.request('post', `projects/${data.id}`, data)
    .then((res) => {
      if (res.status === 200) {
        dispatch('loadProjects');
      }
    });
};

const addUserToProject = ({ dispatch }, data) => {
  api.request('post', `projects/${data.id}/add_user/${data.userId}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch('loadProjects');
      }
    });
};

const deleteUserFromProject = ({ dispatch }, data) => {
  // console.log('delete', data);
  api.request('delete', `projects/${data.id}/users/${data.userId}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch('loadProjects');
      }
    });
};

const loadUsers = ({ commit }) => {
  api.getData('get', 'users/')
    .then((data) => {
      commit('LOADED_USERS', data);
    })
    .catch((error) => {
      commit('SET_ERROR', error);
    });
};

const createUser = ({ dispatch }, data) => {
  api.request('post', 'users/', data)
    .then((res) => {
      if (res.status === 200) {
        dispatch('loadUsers');
      }
    });
};

const deleteUser = ({ dispatch }, id) => {
  api.request('delete', `users/${id}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch('loadUsers');
      }
    });
};

const saveUser = ({ dispatch }, data) => {
  api.request('post', `users/${data.id}`, data)
    .then((res) => {
      if (res.status === 200) {
        dispatch('loadUsers');
      }
    });
};

const loadTasks = ({ commit }) => {
  api.getData('get', 'tasks/')
    .then((data) => {
      commit('LOADED_TASKS', data);
    })
    .catch((error) => {
      commit('SET_ERROR', error);
    });
};

const createTask = ({ dispatch }, data) => {
  api.request('post', 'tasks/', data)
    .then((res) => {
      if (res.status === 200) {
        dispatch('loadTasks');
        dispatch('loadProjects');
      }
    });
};

const deleteTaskFromUser = ({ dispatch }, data) => {
  if (data.id === '') {
    api.request('delete', `task/${data.taskId}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadTasks');
        }
      });
  } else {
    api.request('delete', `users/${data.id}/task/${data.taskId}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadProjects');
        }
      });
    api.request('delete', `task/${data.taskId}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadTasks');
        }
      });
  }
};

const saveTaskToUser = ({ dispatch }, data) => {
  // console.log('data', data);
  if (data.oldUserId !== data.userId) {
    api.request('post', `tasks/${data.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadTasks');
          dispatch('loadProjects');
        }
      });
    api.request('post', `users/${data.userId}/add_task/${data.id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadProjects');
        }
      });
  }
};

const saveTaskToProject = ({ dispatch }, data) => {
  // console.log('data', data);
  if (data.userId === data.oldUserId && isNaN(data.y)) {
    data.y = 0;
    data.userId = '';
    api.request('post', `tasks/${data.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadTasks');
          dispatch('loadProjects');
        }
      });
    api.request('delete', `users/${data.oldUserId}/task/${data.id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadProjects');
        }
      });
  } else if (data.userId === data.oldUserId) {
    api.request('post', `tasks/${data.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadTasks');
          dispatch('loadProjects');
        }
      });
    if (data.oldY === 138) {
      api.request('delete', `users/${data.oldUserId}/task/${data.id}`)
        .then((res) => {
          if (res.status === 200) {
            dispatch('loadProjects');
          }
        });
      setTimeout(() => {
        api.request('post', `users/${data.userId}/add_task/${data.id}`)
          .then((res) => {
            if (res.status === 200) {
              dispatch('loadProjects');
            }
          });
        api.request('post', `tasks/${data.id}`, data)
          .then((res) => {
            if (res.status === 200) {
              dispatch('loadTasks');
              dispatch('loadProjects');
            }
          });
      }, 100);
    }
  } else {
    api.request('post', `users/${data.userId}/add_task/${data.id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadProjects');
        }
      });

    api.request('post', `tasks/${data.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadTasks');
          dispatch('loadProjects');
        }
      });

    api.request('delete', `users/${data.oldUserId}/task/${data.id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadProjects');
        }
      });
  }
};

const saveTaskListToUser = ({ dispatch }, data) => {
  if (data.userId === '' || data.userId === data.oldUserId) {
    api.request('post', `tasks/${data.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadTasks');
          dispatch('loadProjects');
        }
      });
  } else if (data.oldUserId === '') {
    api.request('post', `tasks/${data.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadTasks');
          dispatch('loadProjects');
        }
      });

    api.request('post', `users/${data.userId}/add_task/${data.id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadProjects');
        }
      });
  } else {
    api.request('post', `tasks/${data.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadTasks');
          dispatch('loadProjects');
        }
      });

    api.request('delete', `users/${data.oldUserId}/task/${data.id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadProjects');
        }
      });

    api.request('post', `users/${data.userId}/add_task/${data.id}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch('loadProjects');
        }
      });
  }
};


export default {
  loadStatus,
  loadProjects,
  createProject,
  deleteProject,
  saveProject,
  addUserToProject,
  deleteUserFromProject,

  loadUsers,
  createUser,
  deleteUser,
  saveUser,

  loadTasks,
  createTask,
  deleteTaskFromUser,
  saveTaskToUser,
  saveTaskToProject,
  saveTaskListToUser,
};
