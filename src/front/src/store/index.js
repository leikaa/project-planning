import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import project from './project';
import user from './user';
import task from './task';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    project,
    user,
    task,
  },
  debug: true,
  state,
  getters,
  actions,
  mutations,
});
