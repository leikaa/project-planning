<template>
	<div class="wrap">
    <users/>
    <div class="calendar-task">
      <calendar-header/>
      <user-task/>
    </div>
    <backlog/>
  </div>
</template>

<script>
import 'style.sass';

import { mapGetters } from 'vuex';

import Users from './components/Users.vue';
import CalendarHeader from './components/CalendarHeader.vue';
import UserTask from './components/UserTask.vue';
import Backlog from './components/Backlog.vue';

export default {
  name: 'App',
  components: {
    Users,
    CalendarHeader,
    UserTask,
    Backlog,
  },
}
</script>
<style lang="scss">
body{
  padding: 10px 10px 0 0;
  margin: 0;
}
.wrap{
  min-height: 100vh;
  width: 10000px;
  display: flex;
}
</style>
