export default {
  status: {
    loading: true,
  },
  error: null,
  projects:[],
  users:[],
  tasks:[],
  
  ui: {
    defaultPagination: [20, 50, { text: 'All', value: -1 }],
    defaultControls: [
      { name: 'Edit', icon: 'edit', color: 'teal lighten-1', emit: 'editItem' },
      { name: 'Delete', icon: 'delete', color: 'pink lighten-2', emit: 'deleteItem' },
    ],
    DeleteControls: [
      { name: 'Delete', icon: 'delete', color: 'pink lighten-2', emit: 'deleteItem' },
    ],
    taskListControls:[
      { name: 'Edit', icon: 'edit', color: 'teal lighten-1', emit: 'editItem' },
      { name: 'Delete', icon: 'delete', color: 'pink lighten-4', emit: 'deleteItem' }  
    ]
  },
};
