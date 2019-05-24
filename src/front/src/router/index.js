import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/TableProject.vue';
import Project from '../pages/TemplateProject.vue';
import TableUser from '../pages/TableUser.vue';

Vue.use(Router);

const routes = [
  { path: '/', component: Home },
  { path: '/Home', component: Home },
  { path: '/User', component: TableUser },
  { path: '/Project/:id', name: 'Project', component: Project },
];

export default new Router({
  mode: 'history',
  routes,
});
