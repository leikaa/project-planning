<template>
  <div class="week calendar__week">
    <div class="week__month-info">{{monthName}}<br>{{daysInWeek}}</div>
    <day
      v-for="(day, index) in days"
      :key="index"
      :item="day"
    />
  </div>
</template>

<script>
import Day from './Day.vue';
export default {
  name: 'Week',
  props: {
    days: {
      type: Array,
    },
    monthName: {
      type: String,
    }
  },
  components: {
    Day,
  },
  computed: {
    daysInWeek() {
      let lastDayNum = this.days[this.days.length - 1].num;
      return `${this.days[0].num} - ${lastDayNum}`;
    },
  },
}
</script>
<style lang="scss">
.week{
  text-align: center;
  position: relative;
  display: flex;
  &__month-info{
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    text-align: center;
    pointer-events: none;
  }
}
</style>
