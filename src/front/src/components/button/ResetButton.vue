<template v-slot:activator>
  <v-btn
    color="error"
    fab
    dark
    small
    @click="$emit('reset')"
  >
    <a class="text">reset</a>
  </v-btn>
</template>

<script>
export default {
  name: 'ResetButton',
};
</script>

<style>
.text{
    color: white;
    font-size: 10px;
}
</style>
