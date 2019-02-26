<template>
  <div class="backlog">
    <div
      v-for="item in items"
      :key="item.id"
      :style="`background: ${item.bgc}`"
      class="backlog__item"
    >
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {id: 1, name: 'Задача 1', bgc: 'blueviolet'},
        {id: 2, name: 'Задача 2', bgc: 'cadetblue'},
        {id: 3, name: 'Задача 3', bgc: 'aquamarine'},
        {id: 4, name: 'Задача 4', bgc: 'violet'},
        {id: 5, name: 'Задача 5', bgc: 'azure'},
      ]
    }
  },
}
</script>
<style lang="scss">
.backlog{
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 400px;
  background: #ffffff;
  z-index: 10;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
  padding: 10px;
  &__item{
    height: 30px;
    margin-bottom: 10px;
    padding: 10px;
  }
}
</style>
