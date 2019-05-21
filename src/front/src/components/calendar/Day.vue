<template>
  <div class="calendar__day">
    <!-- {{ test }} -->
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
    // test: {
    //   type: Number,
    // },
    dayInName: {
      type: String,
    },
  },
};
</script>
