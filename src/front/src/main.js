import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';


import App from './App.vue';
import store from './store';
import router from './router';

Vue.use(Vuetify);
Vue.use(Vuex);


const vue = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
});

store.dispatch('project/loadAll');
