/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import api from '../../api';

const loadEntitiesFromBackend = (store) => {
  api.getData('get', 'project/all/')
    .then((data) => {
      store.commit('LOADED_ALL', data);
    });
};

/**
 * Load menus, entities
 * @param {store} store
 */
const loadAll = (store) => {
  console.log('loadAll', store, store.state.loadFromBackend);
  if (store.state.loadFromBackend) {
    loadEntitiesFromBackend(store);
  }
};

/**
 * Load Entity from backend
 * @param {Object} store
 * @param {Object} payload
 */


const loadEntity = (store, { entityName }) => {
  // console.log('loadEntity', store.state, payload);
  api.getData('get', entity.getApiPathByEntityName(store.state, entityName))
    .then((data) => {
      // console.log('resolve', data);
      store.commit('LOADED_ENTITY', { data, entityName });
    });
};


export default {
  loadAll,
  loadEntity,
};
