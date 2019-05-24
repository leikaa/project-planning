<template v-slot:activator>
  <div class="button_add_task_in_project">
    <v-btn
      color="rgba(232, 90, 78, 1)"
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
  props: {
    postTitle: {
      type: String,
      required: true,
    },
  },
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
