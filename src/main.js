import Vue from 'vue';
import Vuex from 'vuex';
import storeData from './js/store.js';
import App from './App.vue';

Vue.use(Vuex);

const store = new Vuex.Store(storeData);

const vue = new Vue({
  el: '#app',
  render: h => h(App),
  store
});
