<template v-slot:activator>
  <v-btn
    small
    fab
    dark
    color="rgba(255, 0, 0, 0.5)"
    class="button_user"
    @click="$emit('editItem')"
  >
    <v-icon dark>
      add
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'CreateButton',
};
</script>

<style>
.button_user {
  left: 5px;
  box-shadow: none !important;
}
</style>
