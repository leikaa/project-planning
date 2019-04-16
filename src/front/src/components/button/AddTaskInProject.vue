<template>
    <div class="button_add_task_in_project">
      <v-btn slot="activator" 
      color="green  accent-3" 
      @click="$emit('addItem')"
      dark>
      Добавить задачу в проект
      </v-btn>
    </div>
</template>


<script>
export default {
  name: "ButtonAddTaskInProject"
};
</script>

<style>
.button_add_task_in_project {
  display: flex;
  height: 50px;
  width: 100%;
  background:rgba(255, 255, 255, 0);
  position: fixed;
  bottom: 0;
  z-index: 11;
  justify-content: center;
}
</style>

