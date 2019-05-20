<template>
  <div class="month calendar__month">
    <div class="month__month-inf">
      {{ monthName }}
    </div>
    <week
      v-for="(days, index) in item.weeks"
      :key="index"
      :month-name="getMonthName(item.weeks, index)"
      :days="days"
    />
  </div>
</template>

<script>
import Week from './Week.vue';

export default {
  name: 'Month',
  components: {
    Week,
  },
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    monthName() {
      return this.item.name;
    },
  },
  methods: {
    getMonthName(weeks, index) {
      // console.log(weeks);
      if (index !== weeks.length - 1) {
        return this.item.name;
      }
      const lastDaysInMonth = [28, 29, 30, 31];
      const lastWeek = weeks[weeks.length - 1];
      const numLastDayInWeek = lastWeek[lastWeek.length - 1].num;
      const test = lastDaysInMonth.includes(numLastDayInWeek) ? this.item.name : this.item.nextMonthName;
      // console.log(test);
      return test;
    },
  },
};
</script>
<style lang="scss">
.month{
  position: relative;
  display: flex;
  height: 70px;
  background: #fff;
   &__month-inf{
    display: flex;
    position: absolute;
    width: 100%;
    justify-content:center;
    pointer-events: none;
    border: 1px solid gray;
  }
}
</style>
