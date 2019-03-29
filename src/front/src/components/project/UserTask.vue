<template>
  <div>
    <div class="task-list">
      <div
        v-for="(list, index) in currentProject.users"
        :key="index"
        :data-id="index"
        ref="currentProject"
        class="pole user-task task-list__item"
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
          @mouseup.native="saveTask(item)"
          @dblclick.native="deleteItem(item)" 
          @click.native="someMethod()"
          maximize
        >
        <!-- @dragstop="onDrag" -->
          <div class="user-task__item" :style="`background: ${item.rgb}`">
             <div class="task-text">{{item.name}}</div>
          </div>
        </vue-draggable-resizable>
      </div>
 <!-- Добавление задач @mouseup.native.ctrl="addItem"  -->
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
                  <select v-model="selectedElement" class="select-element">
                    <option disabled value="">Список участников проекта</option>
                    <option 
                    v-for="item in currentProjectUsers" 
                    :value="item.userId"
                    :key="item.userId"
                    >
                    {{item.name}}
                    </option>
                  </select>
                  <!-- <v-select
                    v-model="selectedElement"
                    :items="currentProjectJoinUsers"
                    label="Выберите участника"
                    solo
                    item-text="name"
                    item-value="_id"
                  ></v-select> -->
                  <div class="pickers">
                   <v-date-picker 
                   v-model="startDate"
                   width= "220">
                   </v-date-picker>
                   <v-date-picker 
                   v-model="endDate"
                   show-current = "false" 
                   width= "230">
                   </v-date-picker>
                  </div>
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
  <!--Удаление задач -->
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
import VueDraggableResizable from "../vue-drag/index.js";
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
      showTask: false,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
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

    // sendRequestJoin() {
    //   this.$store.dispatch("joinUsers");
    // },

    addItem() {
      this.modalTitle = "Добавить новую задачу";
      this.modalSubmitButton = "Добавить";
      this.modalAction = "Add";
      this.projectId = "currentProjectId";
      this.userId = this.selectedElement;
      this.startDate = this.startDate;
      this.endDate = this.endDate;
      this.x = 0;
      this.y = 46;
      this.w = 0;
      this.h = 46;
      this.rgb = 'rgb(244,67,54)'
      this.description = "";
      this.name = '';
      this.disableInput = false;
      this.showDialog = true;
    },

    deleteItem(item) {
      this.modalTitle = 'Удалить задачу';
      this.modalSubmitButton = 'Удалить';
      this.modalAction = 'Delete';
      this.taskId = item.taskId;
      this.projectId = "currentProjectId";
      this.name = item.name;
      this.disableInput = true;
      this.showTask = true;
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
          this.deleteTask();
          break;
      }
    },

    addTask() {
      console.log(
        "Задача добавлена",
        this.name,
        this.description,
      );
      this.$store.dispatch("addTask", {
        projectId: this.currentProjectId,
        userId: this.selectedElement,
        startDate : this.startDate,
        endDate: this.endDate,
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.h,
        rgb: this.rgb,
        description: this.description,
        name: this.name,
        dateCreate: moment().format('MMMM Do YYYY, HH:mm:ss '),
      });
      this.showDialog = false;
      this.sendRequestTask();
    },

    saveTask(item) {
      console.log('Проект сохранен', item.taskId, this.currentProjectId);
      this.$store.dispatch('saveTask', {
        id: item.taskId, 
        projectId: this.currentProjectId,
        x: this.getCurrentItemXCoordinate(),
        w: this.getCurrentItemWCoordinate(),
        y: this.getCurrentItemYCoordinate(),
        dateCreate: moment().format('MMMM Do YYYY, HH:mm:ss '),
      });  
      this.sendRequestTask();
    },

    deleteTask() {
      console.log('Задача удалена', this.taskId , this.currentProjectId);
      this.$store.dispatch('deleteTaskOnProject', {
         taskId: this.taskId,
         id: this.currentProjectId,
        });
      this.showTask = false;
      this.sendRequestTask();
    },

    //  updateServersStatus() {
    //   this.$store.dispatch("joinUsers");
    //   this.timerId = setTimeout(() => {
    //     this.updateServersStatus();
    //   }, 2000);
    // },
/*
    onDrag(x, y, item, task) {
      let allTaskListCoords = this.getCoordsTaskList();

      let diffCoords = this.getDiffCoords(allTaskListCoords, task);

      let nearTaskListIndex = this.getNearTaskListIndex(diffCoords);

      this.setTaskInTaskList(nearTaskListIndex, item, task);
    },

    getCoordsTaskList() {
      let coords = [];

      this.$refs.currentJoinProject.forEach(taskDiv => {
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

      this.currentJoinProject.forEach((list, listIndex) => {
        list.task.forEach((task, taskIndex) => {
          if (task.id == item.id && listIndex != nearTaskListIndex) {
            this.taskList[listIndex].splice(taskIndex, 1);
            this.taskList[nearTaskListIndex].push(item);
          }
        });
      });
    }
    */
  getCurrentItemXCoordinate(){
    const left = event.currentTarget.style.left;
    return left.slice(0, -2);
  },
  
  getCurrentItemWCoordinate(){
    const width = event.currentTarget.style.width;
    return width.slice(0, -2);
  },

  getCurrentItemYCoordinate(){
    const top = event.currentTarget.style.top;
    return top.slice(0, -2);
  },
 
  someMethod() {
    let left = event.currentTarget.style.left;
    let width = event.currentTarget.style.width;
    let top = event.currentTarget.style.top;
     
    var x = left.slice(0, -2);
    var w = width.slice(0, -2);
    var y = top.slice(0, -2);

    console.log("Координаты задачи", x , w , y )
   }
  },

  computed: {
    projects() {
      return this.$store.getters.projects;
    },

    currentProjectId() {
      return this.$route.params.id;
    },
    
    currentProject() {
      return this.projects.find(item => {
        return item._id === this.currentProjectId;
      });
    },

    currentProjectUsers() {
      return (this.currentProject && this.currentProject.users) || [];
    }, 

    // joinUserToProjects() {
    //   return this.$store.getters.joinUserToProjects;
    // },

    // currentJoinProject() {
    //   return this.joinUserToProjects.find(item => {
    //     return item._id === this.currentProjectId;
    //   });
    // },

    // currentProjectJoinUsers() {
    //   return (this.currentJoinProject && this.currentJoinProject.user) || [];
    // },


    





    
    // getCoordsTaskList(){ // работает, но есть ошибка 
    //       let result = this.currentJoinProject.users.forEach((item) => { 
    //       let task = item.task.forEach((el) => {

    //       let dateOne = el.dateOne;
    //       let dateTwo = el.dateTwo;

    //       let dateOn = dateOne.split('-');
    //       let dateTw = dateTwo.split('-');

    //       let OneDate = new Date(dateOn[0] ,  dateOn[1] - 1, dateOn[2]);
    //       let TwoDate = new Date(dateTw[0] ,  dateTw[1] - 1, dateTw[2]);
    //       let resultDate =  ((TwoDate - OneDate)/ 1000 / 60 / 60 / 24) + 1;
    //       let W = (resultDate * 21);

    //       let StartDate = new Date(2018,0,1); 
    //       let dateX = ((OneDate - StartDate)/ 1000 / 60 / 60 / 24);
    //       let X = dateX * 21;

    //       this.$set(el, 'x', X)
    //       this.$set(el, 'w', W)
    //       //console.log(el);
    //      });
    //    });
    //  return this.joinUserToProjects.find(item => {
    //     return item._id === this.currentProjectId;
    //   });
    // },
  },
    created() {
    this.sendRequestUser();
    this.sendRequestTask();
    //this.updateServersStatus()
    },

    beforeDestroy() {
    clearTimeout(this.timerId);
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
.task-text{
  display: flex;
  overflow: hidden;
  white-space: nowrap;
}
.pickers{
  display: flex;
  justify-content: space-around;
}

.select-element{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 470px;
  height: 50px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  padding: 0 12px;
  border-radius: 2px;
  font-family: Roboto ,sans-serif;
  line-height: 1.5;
  font-size: 16px;
  margin-bottom: 15px;
  margin-top : 5px;
}
</style>
