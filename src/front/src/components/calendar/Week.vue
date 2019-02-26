<template>
  <div class="week calendar__week">
    <div class="week__month-info">{{monthName}}</div>
    <day
      v-for="(day, index ,) in days"
      v-bind:index="index"
      v-bind:key="day.id"
      v-bind:dayInWeek="getDaysNum(days , index)"
      v-bind:dayInName="getDaysName(days , index)"
    />
  </div>
</template>

<script>
import Day from './Day.vue';
export default {
  name: 'Week',
  props: {
    item: {
      type: Object,
    },
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
    dayInWeek() {
      return this.days.num;
    },
  },
  methods: { 
    getDaysNum(days, index) {
        return this.days[index].num
      },
    getDaysName(days, index) {
        return this.days[index].name
      }
    },  
  }

</script>

<style lang="scss">
.week{
  text-align: center;
  position: relative;
  display: flex;
  &__month-info{
    display: flex;
    position: absolute;
    width: 100%;
    justify-content:center;
    pointer-events: none; 
    border: 1px solid gray;
  }
}
</style>
