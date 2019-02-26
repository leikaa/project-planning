
export default {
  entitiesTitle(state) {
    if (state.currentEntity && state.data.entities && state.data.entities[state.currentEntity]) {
      return state.data.entities[state.currentEntity].titlePlural;
    }
    return '';
  },
};
