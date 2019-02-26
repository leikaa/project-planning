export default {
  STATUS_LOADED(state, payload) {
    // console.log('STATUS_LOADED', payload);

    state.appStatus = payload;
  },

  TOTAL_HISTORY_LOADED(state, payload) {
    state.history.total = payload.data;
  },
  CONTAINER_HISTORY_LOADED(state, payload) {
    state.history.containers[payload[0].info.name] = payload;
  },
  HISTORY_STATS_LOADED(state, payload) {
    state.historyStats = payload.data;
  },

  CLEAR_NOTIFICATIONS: state => {
    state.socket.notifications = [];
  },
  CLEAR_TEST_RESPONSE: state => {
    state.socket.testResponse = null;
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

  SAVED_PROJECT(_, data) {
    console.log('SAVED PROJECT - ', data);
  },


  LOADED_USERS(state, data) { 
    console.log('LOADED_USERS', data);
    state.users = data.map(elem => {
      //elem.status.lastUpdate = dayjs(elem.status.lastUpdate).fromNow(); 
      return elem;
    });//.sort((a, b) => ((a.name > b.name) ? 1 : -1)); Сортировка по символам 
  },

  OPENED_USERS(state, data) {
    // console.log('OPENED_PROJECT', data);
    state.currentUsers = data;
  },

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
