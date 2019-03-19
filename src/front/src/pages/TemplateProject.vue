<template>
	<div class="wrap">
    <change-projects/>
    <div class="calendar-task">
      <calendar-header/>
       <user-task/>
    </div>
   <!-- <backlog/>  -->
  </div>
</template>

<script>
import 'style.sass';
import { mapGetters } from 'vuex';
import ChangeProjects from '../components/ChangeProjects';
import CalendarHeader from '../components/calendar/CalendarHeader';
import UserTask from '../components/UserTask';
//import Backlog from '../components/Backlog';

export default {
  name: 'TemplateProject',
  components: {
    ChangeProjects,
    CalendarHeader,
    UserTask,
   // Backlog
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
  width: 10000px;
  display: flex;
}

</style>