<template>
  <div class="calendar">
    <month
      v-for="item in getMonthWithDays()" 
      v-bind:key="item.name"
      v-bind:item="item"
    />
  </div>
</template>

<script>
import moment from 'moment';  
import Month from './Month.vue'; 

const NUM_ALL_MONTH = 12,
      NUM_DAYS_IN_WEEK = 7,
      CUR_YEAR = moment().format('2018'); 

export default {
  name: 'CalendarHeader',
  components: {
    Month, 
  },
  data() {
    return {
      months: [] 
    }
  },
  methods: {
    getMonthWithDays() {
      let months = []; 
      this.setMonths(months);
      this.setWeeks(months);
      return months;
    },
    setMonths(months) {
      for (let i = 0; i < NUM_ALL_MONTH; i++) {
        months.push({
          numDays: new Date(CUR_YEAR, i + 1, 0).getDate(),
          name: moment([2018]).month(i).format('MMMM - YYYY'),
          nextMonthName: moment([2018]).month(i + 1).format('MMMM - YYYY'), 
          weeks: [], 
        });
      }
    },
    setWeeks(months) {
      let numAddedDays = 0;
      
      months.forEach((el, numMonth) => { 
        let numWeeksInMonth = Math.ceil(el.numDays / NUM_DAYS_IN_WEEK);
        let isAllDays = false; 
        for (let i = 0; i < numWeeksInMonth; i++) { 
          el.weeks[i] = [];   
          for (let j = 0; j < NUM_DAYS_IN_WEEK; j++) {
            if (numAddedDays == el.numDays) {
              isAllDays = true;
            }
            numAddedDays = numAddedDays < el.numDays ? ++numAddedDays : 1; 

             let curDay = new Date(CUR_YEAR, numMonth, numAddedDays);

            el.weeks[i].push({
              name: moment(curDay).weekday(j+1).format('dd'),
              num: numAddedDays,
            });
          }

          if (isAllDays && el.weeks[i].length == NUM_DAYS_IN_WEEK) {
            break;
          }
        }

      });
    },
  },
}
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
