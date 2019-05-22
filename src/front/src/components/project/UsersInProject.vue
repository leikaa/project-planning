<template>
  <div class="users">
    <v-data-iterator
      :items="items"
      hide-actions
      no-data-text="Нет данных"
    >
      <template v-slot:item="props">
        <div class="user users__item user-task">
          <div
            class="user__name pi"
            align="center"
          >
            {{ props.item.name }}
          </div>
          <div class="el">
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
      </template>
    </v-data-iterator>
  </div>
</template>


<script>
export default {
  name: 'User',
  props: {
    items: {
      type: Array,
      default: null,
    },
    controls: {
      type: Array,
      default: null,
    },
  },
  methods: {
    emit(emit, item) {
      // eslint-disable-next-line no-console
      console.log('emit', emit, item);
      this.$emit(emit, item);
    },
  },
};
</script>

<style lang="scss">
.users {
  width: 65px;
  z-index: 10;
  background: #fafafa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  left: 0;
  top: 0;
  padding-top: 52px;
  &__item {
    min-height: 92px;
    margin-bottom: 46px;
  }
}
.user {
  &__name {
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background: #ccc;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 10px;
  }
}
.el {
  height: 100px;
  position: absolute;
  padding-top: 40px;
  margin: 0;
  left: 14px;
}
</style>
