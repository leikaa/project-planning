<template>
  <div>
    <div class="task-list">
      <div
        v-for="(list, index) in currentJoinProject.users"
        :key="index"
        :data-id="index"
        ref="currentProjectUsers"
        class="pole user-task task-list__item"
        @dblclick="editItem"
      >
        <vue-draggable-resizable
          v-for="item in list.task"
          :key="item.taskId"
          :w="item.w"
          :h="item.h"
          :x="item.x"
          :y="item.y"
          :item="item"
          :handles="['ml', 'mr']"
          :grid="[21, 46]"
          @dragstop="onDrag"
          maximize
        >
          <div class="user-task__item" :style="`background: ${item.rgb}`">{{item.text}}</div>
        </vue-draggable-resizable>
      </div>
<!-- Добавление задач  -->
      <v-card>
        <v-layout row align-end>
          <v-dialog v-model="showDialog" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>{{ modalTitle }}</v-card-title>
              <v-card-text>
                <v-form v-model="formValid">
                  <v-text-field
                    v-model="name"
                    label="Название новой задачи"
                    :disabled="disableInput"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="description"
                    label="Описание задачи"
                    :rules="nameRules"
                    :disabled="disableInput"
                    required
                  ></v-text-field>
                  <v-select
                    v-model="selectedElement"
                    :items="currentProjectJoinUsers"
                    label="Выберите участника"
                    solo
                    item-text="name"
                    item-value="_id"
                  ></v-select>
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
 <!-- -->


 
 <v-card>
      <v-layout row align-end>
        <v-dialog v-model="editShowDialog" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>{{ modalTitle }}</v-card-title>
            <v-card-text>
              <v-form v-model="formValid">
                 <v-text-field
                    v-model="userId" 
                    label="ID для проверки работы"
                    :disabled="disableInput"
                    required
                  ></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" flat @click="editShowDialog = false">Отмена</v-btn>
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
    <div class="button_create_task">
      <v-btn slot="activator" 
      color="green  accent-3" 
      @click="addItem" 
      dark>
      Добавить задачу в проект
      </v-btn>
    </div>
  </div>
</template>


<script>
import VueDraggableResizable from "./vue-drag/index.js";
import moment from 'moment';  

let step = 21;
export default {
  name: "UserTask",
  components: {
    VueDraggableResizable
  },
  data() {
    return {
      showDialog: false,
      formValid: false,
      nameRules: [v => !!v || "Описание обязательно"],
      disableInput: false,
      modalSubmitButton: "Добавить",
      modalTitle: "",
      modalAction: "",
      name: "",
      description: "",
      selectedElement: "",
      editShowDialog: false,
      selectedTask: "",
      userId: this.selectedElement,  
    };
  },
  methods: {
    sendRequestProject() {
      this.$store.dispatch("loadProjects");
    },

    sendRequestUser() {
      this.$store.dispatch("loadUsers");
    },

    sendRequestTask() {
      this.$store.dispatch("loadTasks");
    },

    addItem() {
      this.modalTitle = "Добавить новую задачу";
      this.modalSubmitButton = "Добавить";
      this.modalAction = "Add";
      this.projectId = "currentProjectId";
      this.userId = this.selectedElement;
      this.x = 0;
      this.y = 46;
      this.w = 21;
      this.h = 46;
      this.rgb = 'rgb(244,67,54)'
      this.name = "";
      this.description = "";
      this.date = moment().format('MMMM Do YYYY, HH:mm:ss ');
      this.disableInput = false;
      this.showDialog = true;
    },

    editItem(item) {
      this.modalTitle = 'Сохранить информацию о задаче';
      this.modalSubmitButton = 'Сохранить';
      this.modalAction = 'Edit';
      //this.taskId = item.index;
      //this.projectId = this.currentProjectId;
      //this.userId = this.selectedElement;
      //this.name = item.name;
      //this.description = item.description;
      this.x = this.left,
      this.y = this.top;
      this.w = this.widtg;
      this.h = this.height;
      this.rgb = 'rgb(0,205,205)'
      this.date = moment().format('MMMM Do YYYY, HH:mm:ss ');
      this.disableInput = false;
      this.editShowDialog = true;
    },

    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case "Add":
          this.addTask();
          break;
        case 'Edit':
          this.saveProject();
          break;
      }
    },

    addTask() {
      console.log(
        "задача добавлена",
        this.name,
        this.description,
        this.projectId,
        this.userId,
        this.date,
      );
      this.$store.dispatch("addTask", {
        projectId: this.currentProjectId,
        userId: this.selectedElement,
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.h,
        rgb: this.rgb,
        name: this.name,
        description: this.description,
        date: this.date,
      });
      this.showDialog = false;
      this.sendRequestTask();
    },

    saveProject() {
      console.log('Проект сохранен', this.taskId, this.id );
      this.$store.dispatch('saveTask', {
         taskId: this.taskId, 
         id: this.currentProjectId,
         //name: this.name,
         x: this.left,
         y: this.top,
         w: this.widtg,
         h: this.height,
         rgb: this.rgb,
         date: this.date,
         });  
      this.editShowDialog = false;
      this.sendRequestTask();
    },

    onDrag(x, y, item, task) {
      let allTaskListCoords = this.getCoordsTaskList();

      let diffCoords = this.getDiffCoords(allTaskListCoords, task);

      let nearTaskListIndex = this.getNearTaskListIndex(diffCoords);

      this.setTaskInTaskList(nearTaskListIndex, item, task);
    },

    getCoordsTaskList() {
      let coords = [];

      this.$refs.currentProjectUsers.forEach(taskDiv => {
        let taskDivCoords = taskDiv.getBoundingClientRect();
        coords.push({
          id: taskDiv.dataset.id,
          x: taskDivCoords.left + window.pageXOffset,
          y: taskDivCoords.top + window.pageYOffset
        });
      });

      return coords;
    },

    getDiffCoords(taskListCoords, task) {
      let taskCoords = task.getBoundingClientRect();
      return taskListCoords.map(item => {
        return {
          diff: Math.abs(item.y - taskCoords.top),
          id: item.id
        };
      });
    },

    getNearTaskListIndex(diffCoords) {
      let idNearTask = 0;
      let minDemension = null;

      diffCoords.forEach((el, index) => {
        if (minDemension == null) {
          minDemension = el.diff;
        }
        if (el.diff <= minDemension) {
          minDemension = el.diff;
          idNearTask = el.id;
        }
      });

      return idNearTask;
    },

    setTaskInTaskList(nearTaskListIndex, item, task) {
      let taskCoords = task.getBoundingClientRect();

      let taskListCoords = this.getCoordsTaskList();
      item.y = Math.abs(taskListCoords[nearTaskListIndex].y - taskCoords.top);
      console.log(item.y);

      this.currentProjectUsers.forEach((list, listIndex) => {
        list.task.forEach((task, taskIndex) => {
          if (task.id == item.id && listIndex != nearTaskListIndex) {
            this.taskList[listIndex].splice(taskIndex, 1);
            this.taskList[nearTaskListIndex].push(item);
          }
        });
      });
    }
  },
  computed: {
    items() {
      return this.$store.getters.projects;
    },

    elements() {
      return this.$store.getters.users;
    },

    tasks() {
      return this.$store.getters.tasks;
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




    joinUserToProjects() {
      return this.$store.getters.joinUserToProjects;
    },

    currentJoinProject() {
      return this.joinUserToProjects.find(item => {
        return item._id === this.currentProjectId;
      });
    },

    currentProjectJoinUsers() {
      return (this.currentJoinProject && this.currentJoinProject.user) || [];
    }, 






    
    /*
    currentProjectJoinUsersTask() {
      return (this.currentJoinProject && this.currentJoinProject.TaskList) || [];
    }, 
    */
    




/*
   joinUserTaskToProjects() {
      return this.$store.getters.joinUserTaskToProjects;
    },

   currentJoinUserTaskToProjects() {
      return this.joinUserTaskToProjects.find(item => {
        return item._id === this.currentProjectId;
      });
    },

    currentProjectTask() {
      return (this.currentJoinUserTaskToProjects && this.currentJoinUserTaskToProjects.TaskList) || [];
    }, 
*/



  },
  
  created() {
    this.sendRequestProject();
    this.sendRequestUser();
    this.sendRequestTask();
  }
};
</script>

<style lang="scss">
.vue-grid-layout {
  width: 100%;
}
.vue-grid-item {
  background: #ccc;
}
.task-list {
  &__item {
    margin-top: 15px;
    margin-bottom: 46px;
  }
}
.pole {
  background: rgba(0, 0, 0, 0.1);
}
.user-task {
  height: 192px;
  display: flex;
  position: relative;
  &__item {
    height: 46px;
    min-width: 20px;
    padding: 10px;
    position: relative;
    border-radius: 10px;
    box-sizing: border-box;
    z-index: 1;
    cursor: pointer;
  }
}
.button_create_task{
  display: flex;
  height: 50px;
  width: 100%;
  background:rgba(255, 255, 255, 0);
  position: fixed;
  bottom: 0;
  z-index: 11;
  justify-content: center;
}
</style>
