<template v-slot:activator>
  <v-btn
    small
    fab
    dark
    color="green lighten-2"
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['postTitle'],
};
</script>

<style>
.button_user {
  left: 5px;
}
</style>
