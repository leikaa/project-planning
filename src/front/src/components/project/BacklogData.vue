<template>
  <v-data-iterator :items="items" hide-actions no-data-text="">
    <div
      class="backlog__item"
      slot="item"
      slot-scope="props"
      :style="`background: ${props.item.rgb}`"
    >
      <div>{{props.item.name }}</div>
      <div class="controls">
        <v-btn
          class="mx-0"
          icon
          @click="emit(control.emit, props.item)"
          v-for="(control, controlIndex) in controls"
          :key="props.index + '_' + controlIndex"
        >
          <v-icon :color="control.color">{{ control.icon }}</v-icon>
        </v-btn>
      </div>
    </div>
  </v-data-iterator>
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

<style lang="scss">
.controls {
  position: absolute;
  right: 10px;
}
</style>