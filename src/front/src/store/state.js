export default {
  status: {
    loading: true,
  },
  error: null,
  // chartSize: {
  //   currentLoad: 15,
  //   loadAverage: 15,
  //   memoryUsage: 15,
  //   status: 25,
  // },
  // appStatus: {
  //   created: 0,
  //   docker: {
  //     services: [],
  //     info: {
  //       Containers: 0,
  //       ContainersRunning: 0,
  //       ContainersPaused: 0,
  //       ContainersStopped: 0,
  //     },
  //   },
  //   system: {
  //     load: {
  //       uptime: 0,
  //       currentload: 0,
  //       avgload: [0, 0, 0],
  //     },
  //     memory: {},
  //     disk: {},
  //     queues: [],
  //   },
  // },
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
    backlogControls:[
      { name: 'Social', icon: 'people', color: 'white', emit: 'socialItem'},
      { name: 'Edit', icon: 'edit', color: 'teal lighten-4', emit: 'editItem' },
      { name: 'Delete', icon: 'delete', color: 'pink lighten-4', emit: 'deleteItem' }  
    ]
  },
};
