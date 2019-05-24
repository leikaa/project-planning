<template>
  <div class="wrap">
    <change-users-in-projects />
    <div class="calendar-task">
      <calendar-header />
      <div
        class="currentWeek"
        :style="{ left: week + 'px' }"
      />
      <div
        class="currentDate"
        :style="{ left: left + 'px' }"
      />
      <user-task />
    </div>
    <v-container
      class="backlogButton"
    >
      <v-layout
        class="backlogButton"
      >
        <v-btn
          small
          fab
          dark
          color="rgba(255, 0, 0, 0.5)"
          class="buttonBacklog"
          @click.stop="drawer = !drawer"
        >
          <v-icon dark>
            list
          </v-icon>
        </v-btn>
      </v-layout>
    </v-container>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      hide-overlay
      right
    >
      <backlog />
    </v-navigation-drawer>
  </div>
</template>

<script>
import ChangeUsersInProjects from '../components/project/ChangeUsersInProjects.vue';
import CalendarHeader from '../components/calendar/CalendarHeader.vue';
import UserTask from '../components/project/UserTask.vue';
import Backlog from '../components/project/Backlog.vue';

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
      drawer: null,
    };
  },
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
      const cordX = numberDay * 21 - 19;
      return cordX;
    },
    getMondey() {
      const currentDay = this.getCurrentDate();
      const numDay = currentDay.getDay();
      const diff = currentDay.getDate() - numDay + (numDay === 0 ? -6 : 1);
      return new Date(currentDay.setDate(diff));
    },
    getCurrentWeekCords() {
      const currentMondey = this.getMondey();
      const FirstCalendarDay = new Date(2018, 0, 1);
      const numberDay = (currentMondey - FirstCalendarDay) / 1000 / 60 / 60 / 24 + 1;
      const cordWeek = numberDay * 21 - 20;
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
.currentDate{
  width: 20px;
  height: 34px;
  position: absolute;
  top: 36px;
  background: rgba(255, 0, 0, 0.4);
  border-radius: 3px;
  border: 1px solid rgba(255, 0, 0, 1);
}
.currentWeek{
  width: 147px;
  height: 54px;
  position: absolute;
  border: 2px solid rgba(255, 0, 0, 0.6);
  top: 18px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 1);
}
.buttonBacklog{
  position: sticky;
  right: 0;
  top: 0;
  z-index: 11;
}
.backlogButton{
  position: fixed;
  right: 0px;
  top: 0;
  z-index: 11;
  width: auto;
}
</style>
