<template>
  <div class="users">
    <v-data-iterator 
    :items="items" 
    hide-actions 
    no-data-text="Нет данных">
      <div class="user users__item user-task" slot="item" slot-scope="props">
        <div class="user__name pi">{{props.item.name }}</div>
        <div class="el">
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
  </div>
</template>


<script>
export default {
  name: "User",
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
.users {
  width: 54px;
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
  top: 50%;
  margin: 0;
  left: 10px;
}
</style>