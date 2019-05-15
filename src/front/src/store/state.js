export default {
  status: {
    loading: true,
  },
  error: null,
  projects: [],
  users: [],
  tasks: [],
  ui: {
    defaultPagination: [20, 50, { text: 'All', value: -1 }],
    defaultControls: [
      {
        name: 'Edit', icon: 'edit', color: 'teal lighten-1', emit: 'editItem',
      },
      {
        name: 'Delete', icon: 'delete', color: 'pink lighten-2', emit: 'deleteItem',
      },
    ],
    DeleteControls: [
      {
        name: 'Delete', icon: 'delete', color: 'pink lighten-2', emit: 'deleteItem',
      },
    ],
    taskListControls: [
      {
        name: 'Edit', icon: 'edit', color: 'teal lighten-1', emit: 'editItem',
      },
      {
        name: 'Delete', icon: 'delete', color: 'pink lighten-4', emit: 'deleteItem',
      },
    ],
  },
  colors: [
    { color: 'rgb(244, 67, 54)' },
    { color: 'rgb(25, 25, 112)' },
    { color: 'rgb(0, 128, 0)' },
    { color: 'rgb(255, 128 , 0)' },
    { color: 'rgb(128, 0, 128)' },
    { color: 'rgb(128, 0, 0)' },
    { color: 'rgb(30, 144, 255)' },
    { color: 'rgb(153, 153, 0)' },
  ],
  formFields: {},
};
