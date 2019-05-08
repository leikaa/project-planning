<template>
	<div class="wrap">
    <change-users-in-projects/>
    <div class="calendar-task">
      <calendar-header/>
       <user-task/>
    </div>
   <task-list/> 
  </div>
</template>

<script>
import 'style.sass';
import { mapGetters } from 'vuex';
import ChangeUsersInProjects from '../components/project/ChangeUsersInProjects';
import CalendarHeader from '../components/calendar/CalendarHeader';
import UserTask from '../components/project/UserTask';
import TaskList from '../components/project/TaskList';

export default {
  name: 'TemplateProject',
  components: {
    ChangeUsersInProjects,
    CalendarHeader,
    UserTask,
    TaskList
  },
 
}

</script>
<style lang="scss">
body{
  padding: 0;
  margin: 0;
}
.wrap{
  min-height: 100vh;
  width: 24000px;
  display: flex;
}

</style>