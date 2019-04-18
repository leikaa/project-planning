<template>


<!-- <div slot="item" slot-scope="props">
  <div>
    <v-btn
      class="mx-0"
      icon
      @click="emit(control.emit, props.item)"
      v-for="(control, controlIndex) in controls"
      :key="controlIndex"
    >
      <v-icon :color="control.color">{{ control.icon }}</v-icon>
    </v-btn>
  </div>
</div> -->
  <div>
    <v-btn class="mx-0" icon @click="$emit('editItem')">
      <v-icon color="teal lighten-1">{{ icon = "edit" }}</v-icon>
    </v-btn>
    <v-btn class="mx-0" icon @click="$emit('deleteItem')">
      <v-icon color="pink lighten-2">{{ icon = "delete" }}</v-icon>
    </v-btn>
  </div>
</template>


<script>
export default {
  name: "DefaultControls",

  props: ["items", "controls"],
  methods: {
    emit(emit, item) {
      console.log("emit", emit, item);
      this.$emit(emit, item);
    }
  }
};
</script>
