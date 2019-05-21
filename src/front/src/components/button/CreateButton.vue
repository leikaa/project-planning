<template v-slot:activator>
  <div class="button_add_task_in_project">
    <v-btn
      color="green  accent-3"
      dark
      @click="$emit('addItem')"
    >
      <h4>{{ postTitle }}</h4>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CreateButton',
  // eslint-disable-next-line vue/require-prop-types
  props: ['postTitle'],
};
</script>

<style>
.button_add_task_in_project {
  display: flex;
  height: 50px;
  background: rgba(255, 255, 255, 0);
  justify-content: center;
  margin: 5px;
}
</style>
