<template>
  <div class="calendar">
    <month
      v-for="(item, index) in getMonthWithDays()"
      :key="item.name"
      :item="item"
      :data-index="index"
    />
  </div>
</template>

<script>
import moment from 'moment';
import Month from './Month.vue';

const NUM_ALL_MONTH = 36;
const NUM_DAYS_IN_WEEK = 7;
const CUR_YEAR = moment().format('2018');


export default {
  name: 'CalendarHeader',
  components: {
    Month,
  },

  methods: {
    getMonthWithDays() {
      const months = [];
      this.setMonths(months);
      this.setWeeks(months);
      return months;
    },
    setMonths(months) {
      for (let i = 0; i < NUM_ALL_MONTH; i += 1) {
        months.push({
          numDays: new Date(CUR_YEAR, i + 1, 0).getDate(),
          name: moment([2018]).month(i).format('MMMM - YYYY'),
          nextMonthName: moment([2018]).month(i + 1).format('MMMM - YYYY'),
          index: i,
          weeks: [],
        });
      }
    },
    setWeeks(months) {
      let numAddedDays = 0;
      months.forEach((el, numMonth, monthArr) => {
        const numWeeksInMonth = Math.ceil(el.numDays / NUM_DAYS_IN_WEEK);
        let isAllDays = false;
        for (let i = el.weeks.length; i < numWeeksInMonth; i += 1) {
          el.weeks[i] = { items: [], number: null };
          for (let j = 0; j < NUM_DAYS_IN_WEEK; j += 1) {
            if (numAddedDays === el.numDays) {
              isAllDays = true;
            }
            numAddedDays = numAddedDays < el.numDays ? 1 + numAddedDays : 1;
            const curDay = new Date(CUR_YEAR, numMonth, numAddedDays);
            el.weeks[i].items.push({
              name: moment(curDay).weekday(j + 1).format('dd'),
              num: numAddedDays,
            });
          }
          const maxDayNumber = Math.max(...el.weeks[i].items.map(item => item.num));
          const d = new Date(CUR_YEAR, numMonth, maxDayNumber);
          el.weeks[i].number = moment(d).isoWeek();

          if (isAllDays && el.weeks[i].items.length === NUM_DAYS_IN_WEEK) {
            if (numMonth !== 0 && el.weeks[i].number === 1 && monthArr[numMonth + 1]) {
              monthArr[numMonth + 1].weeks.push(el.weeks.pop());
            }
            break;
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
.calendar{
  display: flex;
   border: 1px solid gray;
   z-index: 11;
  &-task{
    background: url('../../images/body_week.png');
    top: 50px;
    position: relative;
  }
  &__week{
    width: 147px;
  }
  &__day{
    width: 21px;
    background: #ffffff;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    font-size: 14px;
    &:hover{
      background: #f2f2f2
    }
  }
}
</style>
