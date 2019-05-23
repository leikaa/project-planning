<template>
  <div id="app">
    <div class="menu">
      <router-link
        to="/Home"
        class="routerLink"
      >
        <navigation-button
          post-title="Выбор проекта"
        />
      </router-link>
      <router-link
        to="/User"
        class="routerLink"
      >
        <navigation-button
          post-title="Участники системы"
        />
      </router-link>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import NavigationButton from './components/button/NavigationButton.vue';

export default {
  name: 'App',
  components: {
    NavigationButton,
  },
};
</script>

<style>
html {
  overflow-y: auto;
  overflow-x: auto;
}
.menu{
  display: flex;
  position: fixed;
  height: 50px;
  width: 100%;
  background:#fff;
  justify-content: center;
  z-index: 11;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.routerLink{
  text-decoration: none;
}
</style>
