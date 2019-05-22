<template>
  <div class="month calendar__month">
    <div class="month__month-inf">
      {{ monthName }}
    </div>
    <week
      v-for="(days, index) in item.weeks"
      :key="index"
      :data-index="index"
      :month-name="getMonthName(item.weeks, index)"
      :days="days.items"
      :number="days.number"
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
      default() {
        return { message: 'Ошибка данных' };
      },
    },
  },
  computed: {
    monthName() {
      return this.item.name;
    },
  },
  methods: {
    getMonthName(weeks, index) {
      if (index !== weeks.length - 1) {
        return this.item.name;
      }
      const lastDaysInMonth = [28, 29, 30, 31];
      const lastWeek = weeks[weeks.length - 1].items;
      const numLastDayInWeek = lastWeek[lastWeek.length - 1].num;
      return lastDaysInMonth.includes(numLastDayInWeek) ? this.item.name : this.item.nextMonthName;
    },
    getDaysNum(days, index) {
      return this.days[index].num;
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
    // border: 1px solid gray;
  }
}
</style>
