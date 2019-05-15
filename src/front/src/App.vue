<template>
  <div id="app">
    <div class="menu">
      <router-link
        to="/Home"
        class="ButtonNavigation"
      >
        <button class="ButtonNavigation">
          Выбор проекта
        </button>
      </router-link>
      <router-link
        to="/User"
        class="ButtonNavigation"
      >
        <button class="ButtonNavigation">
          Участники системы
        </button>
      </router-link>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
html {
  overflow-y: auto;
  overflow-x: auto;
}
.menu{
  display: flex;
  height: 50px;
  width: 100%;
  background:#fff;
  position: fixed;
  top: 0;
  z-index: 11;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.ButtonNavigation{
  display: flex;
  width: 200px;
  height: 40px;
  margin: auto;
  font-weight: 700;
  font-size: 15px;
  color: white;
  border-radius: 3px;
  background: rgb(64,199,129);
  box-shadow: 0 -3px rgb(53,167,110) inset;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
}
</style>
