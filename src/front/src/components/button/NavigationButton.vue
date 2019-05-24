<template>
  <v-btn
    dark
    color="rgba(255, 0, 0, 0.5)"
    class="ButtonNavigation"
  >
    <h4>{{ postTitle }}</h4>
  </v-btn>
</template>

<script>
export default {
  name: 'NavigationButton',
  props: {
    postTitle: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.ButtonNavigation{
  display: flex;
  width: 200px;
  height: 40px;
  font-weight: 700;
  font-size: 15px;
  border-radius: 10px;
}
</style>
