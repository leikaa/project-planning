/* eslint-disable consistent-return, no-console */

import axios from 'axios';
import store from '../store';
import server from '../config/server';

const request = (method, uri, data = null, timeout = 5000) => {
  if (!method) {
    console.error('API function call requires method argument');
    return;
  }

  if (!uri) {
    console.error('API function call requires uri argument');
    return;
  }

  const url = (uri.substr(0, 4) === 'http')
    ? uri
    : server.serverURI + uri;

  return axios({ method, url, data, timeout })
    .catch(error => {
      store.commit('SET_ERROR', error);
    });
};

const getData = (method, uri) => {
  // console.log('getData', store);
  store.commit('project/LOADING');
  return request(method, uri)
    .then(response => {
      // console.log('getData response', response);
      if (response.data.status !== 'ok') {
        store.commit('project/LOADING_ERROR', { message: 'Response status is not ok', code: 406 });
        return;
      }

      store.commit('project/LOADED');
      return response.data.data;
    })
    .catch(error => {
      store.commit('project/LOADING_ERROR', error);
    });
};

/* Удалить в следующем коммите 
const getDataUser = (method, uri) => {
  // console.log('getData', store);
  store.commit('user/LOADING');
  return request(method, uri)
    .then(response => {
      // console.log('getData response', response);
      if (response.data.status !== 'ok') {
        store.commit('user/LOADING_ERROR', { message: 'Response status is not ok', code: 406 });
        return;
      }

      store.commit('user/LOADED');
      return response.data.data;
    })
    .catch(error => {
      store.commit('user/LOADING_ERROR', error);
    });
};

const getDataTask = (method, uri) => {
  //console.log('getData', store);
  store.commit('task/LOADING');
  return request(method, uri)
    .then(response => {
      // console.log('getData response', response);
      if (response.data.status !== 'ok') {
        store.commit('task/LOADING_ERROR', { message: 'Response status is not ok', code: 406 });
        return;
      }

      store.commit('task/LOADED');
      return response.data.data;
    })
    .catch(error => {
      store.commit('task/LOADING_ERROR', error);
    });
};
*/

export default {
  request,
  getData,
  //getDataUser,
  //getDataTask,
};
