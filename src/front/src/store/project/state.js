export default {
  
  status: {
    loading: false,
  },
  ui: {
    defaultControls: [
      { name: 'Edit', icon: 'edit', color: 'teal', emit: 'editItem' },
      { name: 'Delete', icon: 'delete', color: 'pink', emit: 'deleteItem' },
    ],
  },
  loadFromBackend: false,
};
