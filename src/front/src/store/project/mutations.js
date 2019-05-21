/* eslint-disable no-param-reassign, no-console */

const LOADING_SUCCESS = (state) => {
  state.status.loading = false;
};

export default {

  LOGOUT(state) {
    console.log('LOGOUT', state);
  },

  LOADING_ERROR(state, error) {
    console.error('LOADING_ERROR', error);
    state.status.loading = false;
  },

  LOADING(state) {
    state.status.loading = true;
  },

  LOADED(state) {
    LOADING_SUCCESS(state);
  },

  LOADED_ALL(state) {
    LOADING_SUCCESS(state);
  },

  LOADED_WORKLOG(state, payload) {
    console.log('LOADED_WORKLOG', payload);
    state.data.worklog = payload.worklog;
    state.data.incomesByMonth = payload.incomesByMonth;
    state.data.totalIncome = payload.totalIncome;
    LOADING_SUCCESS(state);
  },

  LOADING_SUCCESS,


};
