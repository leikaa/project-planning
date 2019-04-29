<template>
  <div class="select_item">
      <v-select 
      v-model="current"
      :items="colors" 
      solo chips 
      label="Выберите цвет" 
      clearable 
      item-text="color"	                 
      item-value="color"
      >
        <template v-slot:selection="data">
          <v-chip v-bind:color="data.item.color"></v-chip>
        </template>

        <template v-slot:item="data">
          <div class="item" v-bind:style="{'background-color':data.item.color}"></div>
        </template>
      </v-select>   
  </div>
</template>

<script>
export default {
  name: "ColorPicker",
  data() {
    return {
      colors: [
        { color: "rgb(244, 67, 54)"},
        { color: "rgb(25, 25, 112)" },
        { color: "rgb(0, 128, 0)" },
        { color: "rgb(255, 128 , 0)" },
        { color: "rgb(128, 0, 128)" },
        { disabled: true },
        { color: "rgb(128, 0, 0)" },
        { color: "rgb(30, 144, 255)" },
        { color: "rgb(0, 0 , 0)" },
        { color: "rgb(153, 153, 0)" },
        { color: "rgb(160, 160, 160)" }
    ],
    current: "" ,
  }
 },
 //props: ["current"]
};
</script>

<style>
.v-menu__content {
  min-width: 210px !important;
  left: 278px !important;
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
  margin-bottom: 20px;
  padding-top: 12px;
  margin-top: 4px;
}

</style>

