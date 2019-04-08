<template>
  <v-flex xs12 sm3>
    <!-- <select v-model="current" class="select-element">
      <option disabled value>Выберите цвет задачи</option>
      <option
        v-for="item in items"
        :value="item"
        :key="item"
      >
      <template slot="selection" slot-scope="data">
        <v-chip v-bind:color="data.item.color"></v-chip>
      </template>

       <template slot="item" slot-scope="data">
        <div class="item" v-bind:style="{'background-color':data.item.color}"></div>
      </template>
      
      </option>
    </select> -->


    <v-select v-model="rgb" :items="items" chips label="COLOR" clearable>
      <template slot="selection" slot-scope="data">
        <v-chip v-bind:color="data.item.color"></v-chip>
      </template>

      <template slot="item" slot-scope="data">
        <div class="item" v-bind:style="{'background-color':data.item.color}"></div>
      </template>
    </v-select>
  </v-flex>
</template>

 <script>
export default {
  name: "ColorPicker",
  props: ["items" , "rgb"],
  data() {
    return {
       rgb: ""
    }
  },
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
</style>
 