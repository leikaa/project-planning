<template>
  <div class="backlog">
    <div class="backlog__item">
      <h2>Список задач проекта</h2>
    </div>
    <template v-if="unallocated">
      <task-list-data
        :items="unallocatedTasks"
        :controls="controls"
        @deleteItem="deleteItem"
        @editItem="editItem"
      />
    </template>
    <template v-if="distributed">
      <task-list-data
        :items="distributedTasks"
        :controls="controls"
        @deleteItem="deleteItem"
        @editItem="editItem"
      />
    </template>
    <v-checkbox label="Не распределенные задачи" v-model="unallocated" class="check"></v-checkbox>
    <v-checkbox label="Распределенные задачи" v-model="distributed" class="check"></v-checkbox>
    <!-- Удаление данных -->
    <v-card>
      <v-layout row align-end>
        <v-dialog v-model="showDeleteTask" width="500">
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
              <v-btn color="red" flat @click="showDeleteTask=false">Отмена</v-btn>
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
    <!-- Изменение данных -->
    <v-card>
      <v-layout row align-end>
        <v-dialog v-model="showDialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>{{ modalTitle }}</v-card-title>
            <v-card-text>
              <v-form v-model="formValid">
                <v-text-field
                  v-model="name"
                  :disabled="disableInput"
                  label="Название задачи"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="description"
                  label="Описание задачи"
                  :disabled="disableInput"
                  required
                ></v-text-field>
                <div class="CheckColor">
                  <div
                    v-for="(color, index) in colors"
                    :key="index"
                    class="ColorPicker"
                    :style="`background: ${color.color}`"
                  >
                    <v-checkbox
                      v-model="current"
                      height="0px"
                      color="white"
                      class="CheckboxColorPicker"
                      dark
                      :value="`${color.color}`"
                    ></v-checkbox>
                  </div>
                </div>
                <select v-model="selectedElement" class="select-element">
                  <option disabled value >Выберите владельца задачи</option>
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
  </div>
</template>

<script>
import TaskListData from "./TaskListData";
export default {
  name: "TaskList",
  components: {
    TaskListData
  },

  data() {
    return {
      showDialog: false,
      showDeleteTask: false,
      formValid: false,
      disableInput: false,
      disableNameUser: false,
      modalSubmitButton: "Добавить",
      modalTitle: "",
      name: "",
      description: "",
      selectedElement: "",
      unallocated: true,
      distributed: true,

      colors: [
        { color: "rgb(244, 67, 54)" },
        { color: "rgb(25, 25, 112)" },
        { color: "rgb(0, 128, 0)" },
        { color: "rgb(255, 128 , 0)" },
        { color: "rgb(128, 0, 128)" },
        { color: "rgb(128, 0, 0)" },
        { color: "rgb(30, 144, 255)" },
        { color: "rgb(153, 153, 0)" }
      ],
      current: "rgb(244, 67, 54)"
    };
  },

  methods: {
    sendRequest() {
      this.$store.dispatch("loadTasks");
    },

    editItem(item) {
      this.modalTitle = "Редактирование задачи";
      this.modalSubmitButton = "Сохранить";
      this.modalAction = "Edit";
      this.id = item._id;
      this.name = item.name;
      this.description = item.description;
      this.rgb = this.current;
      this.oldUserId = item.userId
      this.selectedElement = item.userId;
      this.disableInput = false;
      this.disableNameUser= true;
      this.showDialog = true;
    },

    deleteItem(item) {
      this.modalTitle = "Удалить задачу";
      this.modalSubmitButton = "Удалить";
      this.modalAction = "Delete";
      this.taskId = item._id;
      this.userId = item.userId;
      this.name = item.name;
      this.disableInput = true;
      this.showDeleteTask = true;
    },

    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case "Edit":
          this.saveTaskListToUser();
          break;
        case "Delete":
          this.deleteTaskFromUser();
          break;
      }
    },

    saveTaskListToUser() {
      console.log(
        "Проект сохранен",
        this.id,
        this.name,
        this.description,
        this.oldUserId,
        this.selectedElement
      );
      this.$store.dispatch("saveTaskListToUser", {
        id: this.id,
        userId: this.selectedElement,
        oldUserId: this.oldUserId,
        name: this.name,
        description: this.description,
        rgb: this.current
      });
      this.showDialog = false;
    },

    deleteTaskFromUser() {
      console.log("Задача удалена", this.taskId, this.userId);
      this.$store.dispatch("deleteTaskFromUser", {
        taskId: this.taskId,
        id: this.userId
      });
      this.showDeleteTask = false;
    }
  },

  computed: {
    tasks() {
      //return this.$store.getters.tasks;
      return this.$store.state.tasks;
    },

    projects() {
      //return this.$store.getters.projects;
      return this.$store.state.projects;
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

    currentProjectUsers() {
      return (this.currentProject && this.currentProject.users) || [];
    },

    controls() {
      return this.$store.state.ui.taskListControls;
    }
  },

  created() {
    this.sendRequest();
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
  margin: 0px 0px 0px 0px;
}
.controls {
  position: absolute;
  right: 10px;
}
</style>
