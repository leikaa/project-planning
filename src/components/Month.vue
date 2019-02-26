<template>
  <div class="month calendar__month">
    <week
      v-for="(days, index) in item.weeks"
      :key="index"
      :monthName="getMonthName(item.weeks, index)"
      :days="days"
    />
  </div>
</template>

<script>
import Week from './Week.vue';
export default {
  name: 'Month',
  props: {
    item: {
      type: Object,
    },
  },
  components: {
    Week,
  },
  computed: {
    monthName() {
      return this.item.name;
    },
  },
  methods: {
    getMonthName(weeks, index) {
      if (index != weeks.length - 1) {
        return this.item.name;
      }

      let lastDaysInMonth = [28, 29, 30, 31];
      let lastWeek = weeks[weeks.length - 1];
      let numLastDayInWeek = lastWeek[lastWeek.length - 1].num;

      return lastDaysInMonth.includes(numLastDayInWeek) ? this.item.name : this.item.nextMonthName;
    },
  },
}
</script>

<style lang="scss">
.month{
  position: relative;
  display: flex;
  height: 54px;
  background: #fff;
}
</style>
