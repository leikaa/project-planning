<template>
  <div class="users">
    <div
      v-for="user in users"
      :key="user.name"
      class="user users__item"
    >
      <div class="user__name">
        {{user.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        users: [
          {name: 'AK', id: ''},
          {name: 'ВУ', id: ''},
          {name: 'КН', id: ''},
          {name: 'СС', id: ''},
        ]
      }
    },
  }
</script>

<style lang="scss">
.users{
  width: 54px;
  height: 100%;
  z-index: 10;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 64px;
  &__item{
    min-height: 92px;
    margin-bottom: 46px;
  }
}
.user{
  &__name{
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
