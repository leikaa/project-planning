/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
export default {
  STATUS_LOADED(state, payload) {
    state.appStatus = payload;
  },

  SET_ERROR(state, error) {
    state.error = error;
  },

  LOADED_PROJECTS(state, data) {
    console.log('LOADED_PROJECTS', data);
    state.projects = data.map((elements) => {
      elements.users.map((elem) => {
        elem.task.map((el) => {
          const { startDate } = el;
          const { endDate } = el;

          const dateOne = startDate.split('-');
          const dateTwo = endDate.split('-');

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
        });
        return elem;
      });
      return elements;
    });
  },

  LOADED_USERS(state, data) {
    console.log('LOADED_USERS', data);
    state.users = data.map(elem => elem);
  },

  LOADED_TASKS(state, data) {
    console.log('LOADED_TASKS', data);
    state.tasks = data.map(elem => elem);
  },
};
