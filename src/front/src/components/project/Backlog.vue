<template>
  <div class="backlog">
    <div class="backlog__item">
      <h2>Список задач проекта</h2>
    </div>
    <div
      v-for="item in currentTasks"
      :key="item.id"
      :style="`background: ${item.rgb}`"
      class="backlog__item"
    >
    {{item.name}}
    </div>
    <v-checkbox value="" label="Не присвоенные задачи"></v-checkbox>
    <v-card>
      <v-layout row align-end>
        <v-dialog v-model="showDialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>{{ modalTitle }}</v-card-title>
            <v-card-text>
              <v-form v-model="formValid">
                <select v-model="selectedElement" class="select-element">
                  <option disabled value>Список участников проекта</option>
                  <option
                    v-for="item in currentProjectUsers"
                    :value="item.userId"
                    :key="item.userId"
                  >{{item.name}}</option>
                </select>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" flat @click="showDialog = false">Отмена</v-btn>
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
    <add-task @addItem="addItem"/>
  </div>
</template>

<script>
import AddTask from "../button/AddTask";
export default {
  components: {
    AddTask, 
  },
  data() {
    return {
      showDialog: false,
      showDialog: false,
      formValid: false,
      id: "",
      name: "",
      disableInput: false,
      modalTitle: "Добавить новый проект",
      modalSubmitButton: "Добавить",
      modalAction: "",
      selectedElement: "",
      active: ""
    };
  },

  methods: {
    addItem() {
      this.modalTitle = "Добавить задачу участнику";
      this.modalSubmitButton = "Добавить";
      this.modalAction = "Add";
      this.projectId = "currentProjectId";
      this.userId = this.selectedElement;
      this.startDate = this.startDate;
      this.endDate = this.endDate;
      this.y = 0;
      this.rgb = "rgb(244,67,54)";
      this.description = "";
      this.name = "";
      this.disableInput = false;
      this.showDialog = true;
    },

    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case "Add":
          this.addTask();
          break;
        case "Delete":
          this.deleteTaskFromProject();
          break;
      }
    },

    addTask() {
      console.log("Задача добавлена", this.name, this.description);
      this.$store.dispatch("addTask", {
        projectId: this.currentProjectId,
        userId: this.selectedElement,
        startDate: this.startDate,
        endDate: this.endDate,
        y: this.y,
        rgb: this.rgb,
        description: this.description,
        name: this.name,
        dateCreate: moment().format("MMMM Do YYYY, HH:mm:ss ")
      });
      this.showDialog = false;
      this.sendRequestTask();
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

    currentTasks() {
      return this.tasks.filter(item => {
        return item.projectId === this.currentProjectId;
      });
    },

    currentProjectUsers() {
      return (this.currentProject && this.currentProject.users) || [];
    },

    currentProject() {
      return this.projects.find(item => {
        return item._id === this.currentProjectId;
      });
    }
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
</style>
