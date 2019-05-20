<template>
  <div class="wrap">
    <change-users-in-projects />
    <div class="calendar-task">
      <calendar-header />
      <div
        class="highlightWeek"
        :style="{ left: week + 'px' }"
      />
      <div
        class="highlightDate"
        :style="{ left: left + 'px' }"
      />
      <user-task />
    </div>
    <backlog />
  </div>
</template>

<script>
import 'style.sass';
import { mapGetters } from 'vuex';
import ChangeUsersInProjects from '../components/project/ChangeUsersInProjects';
import CalendarHeader from '../components/calendar/CalendarHeader';
import UserTask from '../components/project/UserTask';
import Backlog from '../components/project/Backlog';

export default {
  name: 'TemplateProject',
  components: {
    ChangeUsersInProjects,
    CalendarHeader,
    UserTask,
    Backlog,
  },
  data() {
    return {
      left: 0,
      week: 0,
    };
  },
  // computed: {
  //   getMondey() {
  //     const date = new Date();
  //     const m = new Date();
  //     if (date.getDay()) {
  //       m.setDate(date.getDate() + 1 - date.getDay());
  //     } else { m.setDate(date.getDate() + 1); }
  //     return m;
  //   },
  // },
  mounted() {
    const cordX = this.getCurrentDateCords();
    const cordWeek = this.getCurrentWeekCords();
    this.left = cordX;
    this.week = cordWeek;
  },
  methods: {
    getCurrentDate() {
      const currentDay = new Date();
      const dateOne = [
        currentDay.getFullYear(),
        currentDay.getMonth() + 1,
        currentDay.getDate(),
      ];
      const OneDate = new Date(dateOne[0], dateOne[1] - 1, dateOne[2]);
      return OneDate;
    },
    getCurrentDateCords() {
      const currentDay = this.getCurrentDate();
      const FirstCalendarDay = new Date(2018, 0, 1);
      const numberDay = (currentDay - FirstCalendarDay) / 1000 / 60 / 60 / 24 + 1;
      const cordX = numberDay * 21 - 20;
      return cordX;
    },
    getMondey() {
      const currentDay = new Date();
      const monday = new Date();
      if (currentDay.getDay()) {
        monday.setDate(currentDay.getDate() + 1 - currentDay.getDay());
      } else {
        monday.setDate(currentDay.getDate() + 1);
      }
      // console.log(monday)
      return monday;
    },
    getCurrentWeekCords() {
      const currentMondey = this.getMondey();
      const FirstCalendarDay = new Date(2018, 0, 1);
      const numberDay = (currentMondey - FirstCalendarDay) / 1000 / 60 / 60 / 24 + 1;
      const cordWeek = numberDay * 21 - 35;
      return cordWeek;
    },
  },
};

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
.highlightDate{
  width: 20px;
  height: 36px;
  position: absolute;
  background: rgba(159, 8, 197, 0.4);
  top: 36px;
  border-radius: 3px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 1);
}
.highlightWeek{
  width: 147px;
  height: 50px;
  position: absolute;
  background: rgba(226, 148, 3, 0.4);
  top: 20px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 1);
}
</style>
