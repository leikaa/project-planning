/* eslint-disable no-param-reassign, no-console */

export default {
  currentEntityList(state) {
    if (!state.currentEntity) {
      return [];
    }

    return state.data[state.currentEntity];
  },

  /**
   * get title for entity
   */
  entityTitle(state) {
    if (state.currentEntity && state.data.entities && state.data.entities[state.currentEntity]) {
      return state.data.entities[state.currentEntity].title;
    }
    return '';
  },

  /**
   * get Plural title for entity
   */
  entitiesTitle(state) {
    if (state.currentEntity && state.data.entities && state.data.entities[state.currentEntity]) {
      return state.data.entities[state.currentEntity].titlePlural;
    }
    return '';
  },
};
