<template v-slot:activator>
  <div class="button_add_task_in_project">
      <v-btn
        color="green  accent-3"
        @click="$emit('addItem')"
        dark
      >Добавить задачу в проект
      </v-btn>
  </div>
</template>

<script>
export default {
  name: "AddTaskInProject"
};
</script>

<style>
.button_add_task_in_project {
  display: flex;
  height: 50px;
  width: 100%;
  background: rgba(255, 255, 255, 0);
  position: fixed;
  bottom: 0;
  z-index: 11;
  justify-content: center;
}
</style>

