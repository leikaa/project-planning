<template>
  <div>
    <div class="task-list">
      <div
        v-for="(list, index) in getCoordsTaskList.users"
        :key="index"
        :data-id="index"
        ref="getCoordsTaskList"
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
          @click.native="getCurrentDateCoords()"
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


                  <color-picker
                    :items="colors"
                  />


                  
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
import ColorPicker from "./ColorPicker";
import moment from 'moment';  

let step = 21;
export default {
  name: "UserTask",
  components: {
    VueDraggableResizable,
    ColorPicker
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
      rgb: "",
      showTask: false,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),


      colors: [
      {color:'rgb(203, 28, 28)'},
      {color:'rgb(211, 47, 47)'},
      {color:'rgb(244, 67, 54)'},
      {color:'rgb(229, 115, 115)'},
      {color:'rgb(255, 205, 210)'},
      {disabled:true},
      {color:'rgb(136, 14, 79)'},
      {color:'rgb(194, 24, 91)'},    
      {color:'rgb(233, 30, 99)'},    
      {color:'rgb(240, 98, 146)'},
      {color:'rgb(248, 187, 208)'},
    ],
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
      this.startDate = this.startDate;
      this.endDate = this.endDate;
      this.y = 46;
      this.rgb = this.current;
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
          this.deleteTaskFromProject();
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
        y: this.y,
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
        startDate: this.getStartDateFromCoords(),
        endDate: this.getEndDateFromCoords(),
        y: this.getCurrentItemYCoordinate(),
        dateUpdate: moment().format('MMMM Do YYYY, HH:mm:ss '),
      });  
      this.sendRequestTask();
    },

    deleteTaskFromProject() {
      console.log('Задача удалена', this.taskId , this.currentProjectId);
      this.$store.dispatch('deleteTaskFromProject', {
         taskId: this.taskId,
         id: this.currentProjectId,
        });
      this.showTask = false;
      this.sendRequestTask();
    },

    getFirstDay(){
      //Получение пройденных дней от начала календанря.
      const NumberDaysFromStart = this.getCurrentItemXCoordinate() / 21;

      //Получение секунд из пройденных дней.
      const NumberSecondsFromStart = NumberDaysFromStart * 24 * 60 * 60 * 1000;
      
      //Получение даты из секунд.
      const getFirstDay = new Date(NumberSecondsFromStart);
      
      return getFirstDay;
    },

    getStartDateFromCoords(){
      const getFirstDay = this.getFirstDay();
      const startDate = [getFirstDay.getFullYear() + 48, getFirstDay.getMonth() + 1, getFirstDay.getDate()].join('-');
      console.log("startDate",startDate);
      return startDate;
    },

    getEndDateFromCoords(){
      //Длительность задачи.
      const TaskDuration = this.getCurrentItemWCoordinate() / 21;

      const startDate = this.getStartDateFromCoords();
      const getDateOne = new Date(startDate);

      const getFirstDay = this.getFirstDay();
      const getDurationDate = getDateOne.setDate(getFirstDay.getDate() + TaskDuration);

      const getSecondDay = new Date(getDurationDate);

      const endDate = [getSecondDay.getFullYear() , getSecondDay.getMonth() + 1 , getSecondDay.getDate() - 1].join('-');
      console.log("EndDate", endDate);
      return endDate;
    },

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
    },

    getCurrentDate(){
      //Получаем текущую дату.
     const currentDay = new Date();
     //console.log("currentDay", currentDay);
     //Получение текущей даты без времени.
     const dateOne = [currentDay.getFullYear() , currentDay.getMonth() + 1 , currentDay.getDate()];
     const OneDate = new Date(dateOne[0] ,  dateOne[1] - 1, dateOne[2]);
     return OneDate;
    },

    getCurrentDateCoords(){
     const currentDay = this.getCurrentDate();
     //Получаем дату начала календаря.
     const FirstCalendarDay = new Date(2018,0,1);
     //console.log("FirstCalendarDay", FirstCalendarDay);

     //Количество дней пройденных от начала.
     const numberDay =  ((currentDay - FirstCalendarDay)/ 1000 / 60 / 60 / 24) + 1;
     //console.log("numberDay", numberDay);

     //Координата к которой будет перемещаться scroll при загрузке.
     const cordX = (numberDay * 21) - 200;
     //console.log("cordX", cordX);
     return cordX;
    },

    scrollCurrentDate(){
     const cordX = this.getCurrentDateCoords();
     window.scrollTo(cordX , 0);
    },

    getRandomRgb(){
      var num = Math.round(0xffffff * Math.random());
      var r = num >> 16;
      var g = num >> 8 & 255;
      var b = num & 255;
      const rgb = 'rgb(' + r +',' + g + ',' + b + ')';

      console.log("rgb" , rgb)
      return rgb;
    },

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

    getCoordsTaskList(){
      if (this.currentProjectUsers === undefined){
        return this.currentProjectUsers;
      } 
        this.currentProjectUsers.map(item => { 
          //console.log("item",item)
          item.task.map(el => {
            const startDate = el.startDate;
            const endDate = el.endDate;

            const dateOne = startDate.split('-');
            const dateTwo = endDate.split('-');

            const OneDate = new Date(dateOne[0] ,  dateOne[1] - 1, dateOne[2]);
            const TwoDate = new Date(dateTwo[0] ,  dateTwo[1] - 1, dateTwo[2]);
            const resultDate =  ((TwoDate - OneDate)/ 1000 / 60 / 60 / 24) + 1;

            const W = (resultDate * 21);
            const StartDate = new Date(2018,0,1); 

            const dateX = ((OneDate - StartDate)/ 1000 / 60 / 60 / 24);
            const X = dateX * 21;
            const H = 46;

            this.$set(el, 'x', X);
            this.$set(el, 'w', W);
            this.$set(el, 'h', H);
            //console.log("el",el)
         });
        });
        return this.currentProject;
    },
  },
    created() {
    this.sendRequestUser();
    this.sendRequestTask();
    },

    mounted() {
      this.scrollCurrentDate();
    },
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
  height: 138px;
  display: flex;
  position: relative;
  &__item {
    height: 46px;
    min-width: 20px;
    padding: 10px;
    position: relative;
    border-radius: 10px;
    box-sizing: border-box;
    clear: both;
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
