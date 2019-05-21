<template>
  <v-btn
    dark
    color="green accent-3"
    class="ButtonNavigation"
  >
    <h4>{{ postTitle }}</h4>
  </v-btn>
</template>

<script>
export default {
  name: 'NavigationButton',
  props: ['postTitle'],
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
