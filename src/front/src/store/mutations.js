export default {
  STATUS_LOADED(state, payload) {
    state.appStatus = payload;
  },

  SET_ERROR(state, error) {
    state.error = error;
  },

  LOADED_PROJECTS(state, data) { 
    console.log('LOADED_PROJECTS', data);
    state.projects = data.map(elem => { 
      return elem;
    });
  },

  OPENED_PROJECT(state, data) {
    state.currentProject = data;
  },

  ADDED_PROJECT(_, data) {
    console.log('ADDED PROJECT - ', data);
  },

  DELETED_PROJECT(_, data) {
    console.log('DELETED PROJECT - ', data);
  },

  ADD_USER_TO_PROJECT(_, data) {
    console.log('ADD USER TO PROJECT - ', data);
  },

  DELETE_USER_FROM_PROJECT(_, data) {
    console.log('DELETE USER FROM PROJECT - ', data);
  },

  SAVED_PROJECT(_, data) {
    console.log('SAVED PROJECT - ', data);
  },

  LOADED_USERS(state, data) { 
    console.log('LOADED_USERS', data);
    state.users = data.map(elem => {
      return elem;
    });
  },

  // OPENED_USERS(state, data) {
  //   console.log('OPENED_PROJECT', data);
  //   state.currentUsers = data;
  // },

  ADDED_USER(_, data) {
    console.log('ADDED USER - ', data);
  },

  DELETED_USER(_, data) {
    console.log('DELETED USER - ', data);
  },

  SAVED_USER(_, data) {
    console.log('SAVED USER - ', data);
  },

  LOADED_TASKS(state, data) { 
    console.log('LOADED_TASKS', data);
    state.tasks = data.map(elem => {
      return elem;
    });
  },

  ADDED_TASK(_, data) {
    console.log('ADDED TASK - ', data);
  },

  DELETE_TASK_FROM_PROJECT(_, data) {
    console.log('DELETE TASK FROM PROJECT - ', data);
  },

  DELETED_TASK(_, data) {
    console.log('DELETED TASK - ', data);
  },

  SAVED_TASK(_, data) {
    console.log('SAVED TASK - ', data);
  },
  
  SERVERS_STATUS_LOADED(_, data) {
    console.log('SERVERS STATUSE LOADED - ', data);
  },
};
