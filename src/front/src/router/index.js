import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/project/ProjectsMenu';
import Project from '../pages/TemplateProject';
import TableUser from '../pages/TableUser';

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
