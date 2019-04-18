<template>
  <v-data-iterator
    :items="items"
    content-tag="div"
    hide-actions
    content-class="projects"
    no-data-text="Нет данных"
  >
    <div slot="item" slot-scope="props">
      <router-link :to="{name :'Project', params: {id: props.item._id}}" class="project_name">
        <div>
          <h4>{{ props.item.name }}</h4>
        </div>
      </router-link>
      <div class="elem">
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
  name: "ProjectData",
  props: ["items", "controls"],
  computed: {
    showControls() {
      return this.$props.controls && this.$props.controls.length;
    }
  },
  methods: {
    emit(emit, item) {
      console.log("emit", emit, item);
      this.$emit(emit, item);
    }
  }
};
</script>


<style>
.projects {
  display: flex;
  max-width: 960px;
  margin: 70px auto;
  justify-content: center;
  flex-flow: row wrap;
}
.project_name {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-decoration: none;
  margin: 5px;
  box-sizing: border-box;
  max-width: 150px;
  min-width: 150px;
  height: 150px;
  font-size: 100%;
  text-align: center;
  align-items: center;
  color: white;
  border-radius: 3px;
  background: rgb(64, 199, 129);
  box-shadow: 0 -3px rgb(53, 167, 110) inset;
}
.elem {
  display: flex;
  justify-content: center;
  height: 36px;
}
</style>