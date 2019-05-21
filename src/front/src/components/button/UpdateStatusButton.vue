<template v-slot:activator>
  <div class="button_add_task_in_project">
    <v-btn
      color="blue lighten-2"
      dark
      @click="$emit('sendRequest')"
    >
      <h3>Обновить</h3>
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
