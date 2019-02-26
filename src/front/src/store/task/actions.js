import api from '../../api';
import entity from './entity';



const loadEntitiesFromBackend = store => {
  api.getData('get', 'task/all/')
    .then(data => {
      store.commit('LOADED_ALL', data);
    });
};

/**
 * Load menus, entities
 * @param {store} store
 */
const loadAll = store => {
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
  api.getData('get', entity.getApiPathByEntityName(store.state, entityName))
    .then(data => {
      store.commit('LOADED_ENTITY', { data, entityName });
    });
};

export default {
  loadAll,
  loadEntity,
};
