<template>
  <v-data-iterator
    :items="items"
    hide-actions
    no-data-text=""
  >
    <div
      slot="item"
      slot-scope="props"
      class="backlog__item"
      :style="`background: ${props.item.rgb}`"
    >
      <div class="backlog-text">
        <p align="center">
          {{ props.item.name }}
        </p>
      </div>
      <div class="controls">
        <v-btn
          v-for="(control, controlIndex) in controls"
          :key="props.index + '_' + controlIndex"
          class="mx-0"
          icon
          @click="emit(control.emit, props.item)"
        >
          <v-icon :color="control.color">
            {{ control.icon }}
          </v-icon>
        </v-btn>
      </div>
    </div>
  </v-data-iterator>
</template>

<script>
export default {
  name: 'BacklogData',
  props: ['items', 'controls'],
  methods: {
    emit(emit, item) {
      console.log('emit', emit, item);
      this.$emit(emit, item);
    },
  },
};
</script>

<style lang="scss">
.controls {
  position: absolute;
  right: 10px;
}

.backlog-text {
  display: flex;
  width: 230px;
  height: 50px;
  color: white;
  font-size: 14px;
  justify-content: center;
  margin-right: 65px;
  align-items: center;
}
</style>
