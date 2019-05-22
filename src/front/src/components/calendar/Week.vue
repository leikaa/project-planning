<template>
  <div class="week calendar__week">
    <div class="week__month-info">
       {{ number  }}
    </div>
    <day
      v-for="(day, index ,) in days"
      :key="day.id"
      :index="index"
      :day-in-week="getDaysNum(days , index)"
      :day-in-name="getDaysName(days , index)"
    />
  </div>
</template>

<script>
import Day from './Day.vue';

export default {
  name: 'Week',
  components: {
    Day,
  },
  props: {
    days: {
      type: Array,
      default: null,
    },
    monthName: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      default: null,
    },
  },
  methods: {
    getDaysNum(days, index) {
      return this.days[index].num;
    },
    getDaysName(days, index) {
      return this.days[index].name;
    },
  },
};

</script>

<style lang="scss">
.week{
  text-align: center;
  position: relative;
  display: flex;
  padding-top: 18px;
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
