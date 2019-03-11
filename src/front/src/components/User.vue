<!--
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
    elements() {
      return this.$store.getters.users;
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
    }, 
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
-->




<template>
<div class="users">
      <div
        v-for="(item , num) in currentProjectJoinUsers"
        :key="num"
        class="user users__item user-task"
      >
        <div class="user__name pi">{{ item.name }}</div>
      </div>
      
       <div
          slot="item" 
          slot-scope="props" 
        >
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

    </div>
</template>


<!--
<template>
<div class="users">
    <v-data-iterator 
         :items="currentProjectUsers" 
         content-tag="div" 
         hide-actions 
         content-class="user users__item user-task">
        <div
          slot="item" 
          slot-scope="props" 
        >
          <div class="user__name pi">{{ currentProjectUsers.userId }}</div>
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
</div>
</template>
-->
 
 
 <script>
export default {
  name: "User",
  computed: {
    currentProjectId() {
      return this.$route.params.id;
    },
    
    items() {
      return this.$store.getters.projects;
    },




    joinProjects() {
      return this.$store.getters.joinProjects;
    },

   currentJoinProject() {
      return this.joinProjects.find(joinProject => {
        return joinProject._id === this.currentProjectId;
      });
    },

    currentProjectJoinUsers() {
      return (this.currentJoinProject && this.currentJoinProject.user) || [];
    }, 

    /*
    currentProject() {
      return this.items.find(item => {
        return item._id === this.currentProjectId;
      });
    },
    currentProjectUsers() {
      return (this.currentProject && this.currentProject.users) || [];
    },
    */
  },
  methods: {
    emit(emit, item) {
      // console.log('emit', emit, item);
      this.$emit(emit, item);
    },
    click(props) {
      this.$emit("click", props.item, props.index);
    }
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
.elem{
  display: flex;  
  justify-content: center;
}
</style>