<template>
  <div class="calendar__day">
    {{ dayInName }}
    {{ dayInWeek }}
  </div>
</template>

<script>
export default {
  props: {
    dayInWeek: {
      type: Number,
    },
    dayInName: {
      type: String,
    },
  },
};
</script>
