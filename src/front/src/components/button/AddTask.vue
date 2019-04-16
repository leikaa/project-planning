<template>
  <div class="button_add_task">
    <v-btn
      slot="activator"
      color="green  accent-3"
      @click="$emit('addItem')"
      dark>
    Добавить задачу пользователю
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "ButtonAddTask"
};
</script>

<style>
.button_add_task {
  display: flex;
  height: 50px;
  width: 100%;
  background: rgba(255, 255, 255, 0);
  bottom: 0;
  justify-content: center;
}
</style>



