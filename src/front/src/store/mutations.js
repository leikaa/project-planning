export default {
  STATUS_LOADED(state, payload) {
    state.appStatus = payload;
  },

  SET_ERROR(state, error) {
    state.error = error;
    console.error(error);
  },

  LOADED_PROJECTS(state, data) { 
    console.log('LOADED_PROJECTS', data);
    state.projects = data.map(elements => { 
      elements.users.map(elem =>{
        elem.task.map(el =>{
          const startDate = el.startDate;
          const endDate = el.endDate;
  
          const dateOne = startDate.split("-");
          const dateTwo = endDate.split("-");
  
          const OneDate = new Date(dateOne[0], dateOne[1] - 1, dateOne[2]);
          const TwoDate = new Date(dateTwo[0], dateTwo[1] - 1, dateTwo[2]);
          const resultDate = (TwoDate - OneDate) / 1000 / 60 / 60 / 24 + 1;

          const W = resultDate * 21;
          const StartDate = new Date(2018, 0, 1);

          const dateX = (OneDate - StartDate) / 1000 / 60 / 60 / 24;
          const X = dateX * 21;
          const H = 46;
          el.x = X;
          el.w = W;
          el.h = H;
          return el;
        })
        return elem
      })
      return elements;
    });
  },

  CREATE_PROJECT(_, data) {
    console.log('CREATE PROJECT - ', data);
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

  CREATE_USER(_, data) {
    console.log('CREATE USER - ', data);
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

  CREATE_TASK(_, data) {
    console.log('CREATE TASK - ', data);
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

  ADD_TASK_TO_USER(_, data) {
    console.log('ADD USER TO PROJECT - ', data);
  },
};
