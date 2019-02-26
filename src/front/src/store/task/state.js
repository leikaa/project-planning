export default {
  data: {
    items: [],
    headers: [],
    currentHeaders: [],
    history: [],
  },
  currentEntity: null,
  entities: null,
  status: {
    loading: false,
  },
  ui: {
    defaultPagination: [20, 50, { text: 'All', value: -1 }],
    defaultControls: [
      { name: 'Edit', icon: 'edit', color: 'teal', emit: 'editItem' },
      { name: 'Delete', icon: 'delete', color: 'pink', emit: 'deleteItem' },
    ],
  },
  loadFromBackend: false,
};
