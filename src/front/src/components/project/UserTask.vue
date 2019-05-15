<template>
  <div>
    <div class="task-list">
      <div
        v-for="(list, index) in filterTaskListUsers"
        :key="index"
        :data-id="index"
        :data-name="list.name"
        :data-userId="list.userId"
        ref="getCoordsTaskList"
        class="pole user-task task-list__item"
        @click="getIdUserField()"
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
          @mouseup.native="saveTaskToProject(item)"
          @dblclick.native="deleteItem(item)"
          maximize
        >
          <div class="user-task__item" :style="`background: ${item.rgb}`">
            <div class="task-text">{{item.name}}</div>
          </div>
        </vue-draggable-resizable>
      </div>
      <!-- Добавление задач -->
      <!-- <v-card>
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
                    :rules="nameRules"
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
                    <option disabled value>Список участников проекта</option>
                    <option
                      v-for="item in currentProjectUsers"
                      :value="item._id"
                      :key="item._id"
                    >{{item.name}}</option>
                  </select>
                  <div class="DataPicker">
                    <v-date-picker v-model="startDate" width="220"></v-date-picker>
                    <v-date-picker v-model="endDate" show-current="false" width="230"></v-date-picker>
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
      </v-card> -->
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
    <!-- <add-task-in-project @addItem="addItem"/> -->
  </div>
</template>


<script>
import VueDraggableResizable from "../vue-drag/index.js";
// import AddTaskInProject from "../button/AddTaskInProject";
import moment from "moment";

let step = 21;
export default {
  name: "UserTask",
  components: {
    VueDraggableResizable,
    // AddTaskInProject
  },

  data() {
    return {
      showDialog: false,
      formValid: false,
      // nameRules: [v => !!v || "Описание обязательно"],
      disableInput: false,
      modalSubmitButton: "Добавить",
      modalTitle: "",
      modalAction: "",
      name: "",
      description: "",
      selectedElement: "",
      showTask: false,
      // startDate: new Date().toISOString().substr(0, 10),
      // endDate: new Date().toISOString().substr(0, 10),
      // current: "rgb(244, 67, 54)"
    };
  },

  methods: {
    sendRequestProject() {
      this.$store.dispatch("loadProjects");
    },

    sendRequestTask() {
      this.$store.dispatch("loadTasks");
    },

    sendRequestUser() {
      this.$store.dispatch("loadUsers");
    },

    // addItem() {
    //   this.modalTitle = "Добавить новую задачу";
    //   this.modalSubmitButton = "Добавить";
    //   this.modalAction = "Add";
    //   this.projectId = "currentProjectId";
    //   this.startDate = this.startDate;
    //   this.endDate = this.endDate;
    //   this.y = 0;
    //   this.rgb = this.current;
    //   this.description = "";
    //   this.name = "";
    //   this.disableInput = false;
    //   this.showDialog = true;
    // },

    deleteItem(item) {
      this.modalTitle = "Удалить задачу";
      this.modalSubmitButton = "Удалить";
      this.modalAction = "Delete";
      this.taskId = item.taskId;
      this.userId = item.userId;
      this.name = item.name;
      this.disableInput = true;
      this.showTask = true;
    },

    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        // case "Add":
        //   this.createTask();
        //   break;
        case "Delete":
          this.deleteTaskFromUser();
          break;
      }
    },

    // createTask() {
    //   console.log("Задача добавлена", this.name, this.description, this.current);
    //   this.$store.dispatch("createTask", {
    //     userId: this.selectedElement,
    //     projectId: this.currentProjectId,
    //     startDate: this.startDate,
    //     endDate: this.endDate,
    //     y: this.y,
    //     rgb: this.current,
    //     description: this.description,
    //     name: this.name,
    //     dateCreate: moment().format("MMMM Do YYYY, HH:mm:ss ")
    //   });
    //   this.showDialog = false;
    // },

    saveTaskToProject(item) {
      console.log("Проект сохранен", item.taskId, this.currentProjectId);
      this.$store.dispatch("saveTaskToProject", {
        id: item.taskId,
        projectId: this.currentProjectId,
        startDate: this.getStartDateFromCoords(),
        endDate: this.getEndDateFromCoords(),
        y: this.getCurrentItemYCoordinate(),
        dateUpdate: moment().format("MMMM Do YYYY, HH:mm:ss ")
      });
    },

    deleteTaskFromUser() {
      console.log("Задача удалена", this.taskId, this.userId);
      this.$store.dispatch("deleteTaskFromUser", {
        taskId: this.taskId,
        id: this.userId
      });
      this.showTask = false;
    },

    getFirstDay() {
      //Получение пройденных дней от начала календанря.
      const NumberDaysFromStart = this.getCurrentItemXCoordinate() / 21;

      //Получение секунд из пройденных дней.
      const NumberSecondsFromStart = NumberDaysFromStart * 24 * 60 * 60 * 1000;

      //Получение даты из секунд.
      const getFirstDay = new Date(NumberSecondsFromStart);

      return getFirstDay;
    },

    getStartDateFromCoords() {
      const getFirstDay = this.getFirstDay();
      const startDate = [
        getFirstDay.getFullYear() + 48,
        getFirstDay.getMonth() + 1,
        getFirstDay.getDate()
      ].join("-");
      //console.log("startDate", startDate);
      return startDate;
    },

    getEndDateFromCoords() {
      //Длительность задачи.
      const TaskDuration = this.getCurrentItemWCoordinate() / 21;

      const startDate = this.getStartDateFromCoords();
      const getDateOne = new Date(startDate);

      const getFirstDay = this.getFirstDay();
      const getDurationDate = getDateOne.setDate(
        getFirstDay.getDate() + TaskDuration
      );

      const getSecondDay = new Date(getDurationDate);

      const endDate = [
        getSecondDay.getFullYear(),
        getSecondDay.getMonth() + 1,
        getSecondDay.getDate() - 1
      ].join("-");
      //console.log("EndDate", endDate);
      return endDate;
    },

    getCurrentItemXCoordinate() {
      const left = event.currentTarget.style.left;
      return left.slice(0, -2);
    },

    getCurrentItemWCoordinate() {
      const width = event.currentTarget.style.width;
      return width.slice(0, -2);
    },

    getCurrentItemYCoordinate() {
      const top = event.currentTarget.style.top;
      const le = top.slice(0, -2);
      // if((+le < 0)||(+le > 92)){
      //   console.log("Вышел за пределы")
      // }
      // console.log("top" , top)
      return top.slice(0, -2);
    },

    getCurrentDate() {
      //Получаем текущую дату.
      const currentDay = new Date();
      const dateOne = [
        currentDay.getFullYear(),
        currentDay.getMonth() + 1,
        currentDay.getDate()
      ];
      const OneDate = new Date(dateOne[0], dateOne[1] - 1, dateOne[2]);
      return OneDate;
    },

    getCurrentDateCoords() {
      const currentDay = this.getCurrentDate();
      //Получаем дату начала календаря.
      const FirstCalendarDay = new Date(2018, 0, 1);

      //Количество дней пройденных от начала.
      const numberDay =
        (currentDay - FirstCalendarDay) / 1000 / 60 / 60 / 24 + 1;
  
      //Координата к которой будет перемещаться scroll при загрузке.
      const cordX = numberDay * 21 - 880;
      //console.log("cordX", cordX);
      return cordX;
    },

    scrollCurrentDate() {
      const cordX = this.getCurrentDateCoords();
      window.scrollTo(cordX, 0);
    },

    getIdUserField() {
      // const test = event.target.dataset.name;
      // const test2 = event.currentTarget.dataset.id;
      // console.log("test", test);
      // console.log("test2", test2);
      // return test && test2;
    },
  },

  computed: {
    projects() {
      return this.$store.state.projects;
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

    filterTaskListUsers() {
        return this.currentProjectUsers.map(item => {
          item.task = item.task.filter(el => {
            return el.projectId == this.currentProjectId;
          });
        return item;
      });
    },

    // getCoordsTaskList() {
    //   if (this.filterTaskListUsers === undefined) {
    //     return this.filterTaskListUsers;
    //   }
    //   this.filterTaskListUsers.map(item => {
    //     item.task.map(el => {
    //       const startDate = el.startDate;
    //       const endDate = el.endDate;

    //       const dateOne = startDate.split("-");
    //       const dateTwo = endDate.split("-");

    //       const OneDate = new Date(dateOne[0], dateOne[1] - 1, dateOne[2]);
    //       const TwoDate = new Date(dateTwo[0], dateTwo[1] - 1, dateTwo[2]);
    //       const resultDate = (TwoDate - OneDate) / 1000 / 60 / 60 / 24 + 1;

    //       const W = resultDate * 21;
    //       const StartDate = new Date(2018, 0, 1);

    //       const dateX = (OneDate - StartDate) / 1000 / 60 / 60 / 24;
    //       const X = dateX * 21;
    //       const H = 46;

    //       this.$set(el, "x", X);
    //       this.$set(el, "w", W);
    //       this.$set(el, "h", H);
    //       // console.log("el",el)
    //     });
    //   });
    //   return this.currentProject;
    // },
  },
  created() {
    this.sendRequestUser();
    this.sendRequestTask();
  },

  mounted() {
    this.scrollCurrentDate();
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

.task-text {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  color: white;
  font-size: 16px;
}

.DataPicker {
  display: flex;
  justify-content: space-around;
}

.select-element {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 460px;
  height: 50px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  padding: 0 12px;
  border-radius: 2px;
  font-family: Roboto, sans-serif;
  line-height: 1.5;
  font-size: 16px;
  margin: 5px 0px 20px 5px;
  padding-top: 12px;
}

.CheckColor {
  display: flex;
  justify-content: space-around;
  width: 460px;
  height: 50px;
  margin: 2px 0px 5px 5px;
  padding-top: 5px;
}

.ColorPicker {
  width: 40px;
  height: 30px;
  margin: 0px 9px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.CheckboxColorPicker {
  padding-top: 0px;
  padding-left: 8px;
}
</style>


