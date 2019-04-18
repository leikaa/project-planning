<template>
  <div class="backlog">
    <div class="backlog__item">
      <h2>Список задач проекта</h2>
    </div>
    <template v-if="unallocated">
      <div
        v-for="item in unallocatedTasks"
        :key="item.id"
        :style="`background: ${item.rgb}`"
        class="backlog__item"
      >
        {{item.name}}
        <div class="controls">
          <default-controls @editItem="editItem" @deleteItem="deleteItem"/>
          <!-- <default-controls :controls="controls" @deleteItem="deleteItem"/> -->
        </div>
      </div>
    </template>
    <template v-if="distributed">
      <div
        v-for="item in distributedTasks"
        :key="item.id"
        :style="`background: ${item.rgb}`"
        class="backlog__item"
      >
        {{item.name}}
        <div class="controls">
          <default-controls @editItem="editItem" @deleteItem="deleteItem"/>
          <!-- <v-btn class="mx-0" icon>
            <v-icon color="teal lighten-1">{{ icon = "edit" }}</v-icon>
          </v-btn>
          <v-btn class="mx-0" icon>
            <v-icon color="pink lighten-2">{{ icon = "delete" }}</v-icon>
          </v-btn>-->
        </div>
      </div>
    </template>
    <v-checkbox label="Не распределенные задачи" v-model="unallocated" class="check"></v-checkbox>
    <v-checkbox label="Распределенные задачи" v-model="distributed" class="check"></v-checkbox>

    <v-card>
      <v-layout row align-end>
        <v-dialog v-model="showTask" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>{{ modalTitle }}</v-card-title>
            <v-card-text>
              <v-form v-model="formValid">
                <v-text-field
                  v-model="name"
                  :disabled="disableInput"
                  label="Удаление задачи"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" flat @click="showTask = false">Отмена</v-btn>
              <v-btn
                color="green"
                flat
                @click="confirmModalAction"
                :disabled="!formValid"
              >{{ modalSubmitButton }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import DefaultControls from "../button/DefaultControls";
export default {
  name: "Backlog",
  components: {
    DefaultControls,
  },

  data() {
    return {
      formValid: false,
      disableInput: false,
      modalSubmitButton: "Добавить",
      modalTitle: "",
      showTask: false,
      name: "",
      unallocated: true,
      distributed: true
    };
  },

  methods: {
    sendRequest() {
      this.$store.dispatch("loadProjects");
    },

    editItem(item) {
      this.modalTitle = "Редактирование задачи";
      this.modalSubmitButton = "Сохранить";
      this.modalAction = "Edit";
      //this.id = item._id;
      //this.name = item.name;
      this.disableInput = false;
      this.showDialog = true;
    },
    deleteItem(item) {
      console.log("item" , item )
      this.modalTitle = 'Удалить задачу';
      this.modalSubmitButton = 'Удалить';
      this.modalAction = 'Delete';
      // this.taskId = item.taskId;
      // this.projectId = "currentProjectId";
      // this.name = item.name;
      this.disableInput = true;
      this.showTask = true;
    },

    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case "Edit":
          this.saveProject();
          break;
        case "Delete":
          this.deleteProject();
          break;
      }
    },

    saveProject() {
      console.log("Проект сохранен", this.id, this.name, this.Date);
      this.$store.dispatch("saveProject", {
        name: this.name,
        id: this.id,
        Date: this.Date
      });
      this.showDialog = false;
      this.sendRequest();
    },

    deleteProject() {
      console.log("Проект удалён", this.name, this.id);
      this.$store.dispatch("deleteProject", this.id);
      this.showDialog = false;
      this.sendRequest();
    }
  },

  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },

    projects() {
      return this.$store.getters.projects;
    },

    currentProjectId() {
      return this.$route.params.id;
    },

    unallocatedTasks() {
      return this.tasks.filter(item => {
        return item.projectId === this.currentProjectId && item.userId === "";
      });
    },

    distributedTasks() {
      return this.tasks.filter(item => {
        return item.projectId === this.currentProjectId && item.userId != "";
      });
    },

    currentProject() {
      return this.projects.find(item => {
        return item._id === this.currentProjectId;
      });
    },

    controls() {
      return this.$store.state.ui.DeleteControls;
    },
  }
};
</script>


<style lang="scss">
.backlog {
  position: sticky;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background: #ffffff;
  z-index: 11;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  padding: 10px;
  &__item {
    display: flex;
    width: 280px;
    height: 50px;
    margin-bottom: 10px;
    justify-content: center;
    align-items: center;
  }
}
.check {
  margin-top: 0;
}
.controls {
  position: absolute;
  right: 10px;
}
</style>
