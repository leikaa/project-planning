<template>
  <div class="select_item">
    <v-card>
      <v-select v-model="current" :items="items" chips label="COLOR" clearable>
        <template v-slot:selection="data">
          <v-chip v-bind:color="data.item.color"></v-chip>
        </template>

        <template v-slot:item="data">
          <div class="item" v-bind:style="{'background-color':data.item.color}"></div>
        </template>
      </v-select>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ColorPicker",
  data: () => ({
    items: [
      { color: "rgb(183, 28, 28)" },
      { color: "rgb(211, 47, 47)" },
      { color: "rgb(244, 67, 54)" },
      { color: "rgb(229, 115, 115)" },
      { color: "rgb(255, 205, 210)" },

      { disabled: true },

      { color: "rgb(136, 14, 79)" },
      { color: "rgb(194, 24, 91)" },
      { color: "rgb(233, 30, 99)" },
      { color: "rgb(240, 98, 146)" },
      { color: "rgb(248, 187, 208)" }
    ],
    current: null
  })
};
</script>

<style>
.v-menu__content {
  min-width: 210px !important;
}
.v-list {
  padding: 8px;
}

.v-chip {
  border-radius: 2px;
  width: 60px;
}

.v-list > div {
  display: inline-block;
  width: 40px;
  height: 30px;
  margin: 0 1px 0 0;
  vertical-align: top;
}
.v-list > div.v-list--disabled {
  display: block;
  height: 5px;
}

.v-list__tile--link {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.v-list > div .item {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.select_item {
  width: 460px;
  height: 50px;
  margin-bottom: 50px;
}
</style>

