<template>
<div class="users">
      <div
        v-for="(item , index) in currentProjectUsers"
        :key="index"
        class="user users__item user-task"
      >
        <div class="user__name pi">{{ item }}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: "User",
  methods: {
    sendRequest() {
      this.$store.dispatch("loadProjects");
    },
    sendReques() {
      this.$store.dispatch("loadUsers");
    },
  },
  computed: {
    items() {
      return this.$store.getters.projects;
    },
    currentProjectId() {
      return this.$route.params.id;
    },
    currentProject() {
      return this.items.find(item => {
        return item._id === this.currentProjectId;
      });
    },
    currentProjectUsers() {
      return (this.currentProject && this.currentProject.users) || [];
    }
  },
  created() {
    this.sendRequest();
    this.sendReques();
  }
};
</script>

<style lang="scss">
.users {
  width: 54px;
  z-index: 10;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
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
