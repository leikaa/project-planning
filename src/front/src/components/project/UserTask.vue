<template>
  <div>
    <div class="task-list">
      <div
        v-for="(list, index) in filterTaskListUsers"
        :key="index"
        ref="getCoordsTaskList"
        :data-id="index"
        :data-name="list.name"
        :data-userId="list.userId"
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
          maximize
          @mouseup.native="saveTaskToProject(item)"
          @dblclick.native="deleteItem(item)"
        >
          <div
            class="user-task__item"
            :style="`background: ${item.rgb}`"
          >
            <div class="task-text">
              {{ item.name }}
            </div>
          </div>
        </vue-draggable-resizable>
      </div>
    </div>
    <one-field-modal
      :show-dialog="showDeleteTask"
      :modal-title="formFields.modalTitle"
      :label="formFields.label"
      :modal-submit-button="formFields.modalSubmitButton"
      @modalConfirm="confirmModalAction"
      @falseDialog="showDeleteTask=false"
    >
      <template v-slot:body />
    </one-field-modal>
  </div>
</template>


<script>
import moment from 'moment';
// eslint-disable-next-line import/extensions
import VueDraggableResizable from '../vue-drag/index.js';
// eslint-disable-next-line import/no-unresolved
import OneFieldModal from '../common/OneFieldModal ';

// const step = 21;
export default {
  name: 'UserTask',
  components: {
    VueDraggableResizable,
    OneFieldModal,
  },

  data() {
    return {
      showDeleteTask: false,
    };
  },

  computed: {
    projects() {
      return this.$store.state.projects;
    },

    formFields() {
      return this.$store.state.formFields;
    },

    currentProjectId() {
      return this.$route.params.id;
    },

    currentProject() {
      return this.projects.find(item => item._id === this.currentProjectId);
    },

    currentProjectUsers() {
      return (this.currentProject && this.currentProject.users) || [];
    },

    filterTaskListUsers() {
      return this.currentProjectUsers.map((item) => {
        item.task = item.task.filter(el => el.projectId === this.currentProjectId);
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
  },

  methods: {
    sendRequestProject() {
      this.$store.dispatch('loadProjects');
    },

    sendRequestTask() {
      this.$store.dispatch('loadTasks');
    },

    sendRequestUser() {
      this.$store.dispatch('loadUsers');
    },

    deleteItem(item) {
      this.formFields.modalTitle = 'Удалить задачу';
      this.formFields.modalSubmitButton = 'Удалить';
      this.formFields.label = 'Название задачи';
      this.modalAction = 'Delete';
      this.taskId = item.taskId;
      this.userId = item.userId;
      this.formFields.name = item.name;
      this.formFields.disableInput = true;
      this.showDeleteTask = true;
    },

    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case 'Delete':
          this.deleteTaskFromUser();
          break;
      }
    },

    saveTaskToProject(item) {
      console.log('Проект сохранен', item.taskId, this.currentProjectId);
      this.$store.dispatch('saveTaskToProject', {
        id: item.taskId,
        projectId: this.currentProjectId,
        startDate: this.getStartDateFromCoords(),
        endDate: this.getEndDateFromCoords(),
        y: this.getCurrentItemYCoordinate(),
        dateUpdate: moment().format('MMMM Do YYYY, HH:mm:ss '),
      });
    },

    deleteTaskFromUser() {
      console.log('Задача удалена', this.taskId, this.userId);
      this.$store.dispatch('deleteTaskFromUser', {
        taskId: this.taskId,
        id: this.userId,
      });
      this.showDeleteTask = false;
    },

    getFirstDay() {
      // Получение пройденных дней от начала календанря.
      const NumberDaysFromStart = this.getCurrentItemXCoordinate() / 21;

      // Получение секунд из пройденных дней.
      const NumberSecondsFromStart = NumberDaysFromStart * 24 * 60 * 60 * 1000;

      // Получение даты из секунд.
      const getFirstDay = new Date(NumberSecondsFromStart);

      return getFirstDay;
    },

    getStartDateFromCoords() {
      const getFirstDay = this.getFirstDay();
      const startDate = [
        getFirstDay.getFullYear() + 48,
        getFirstDay.getMonth() + 1,
        getFirstDay.getDate(),
      ].join('-');
      // console.log("startDate", startDate);
      return startDate;
    },

    getEndDateFromCoords() {
      // Длительность задачи.
      const TaskDuration = this.getCurrentItemWCoordinate() / 21;

      const startDate = this.getStartDateFromCoords();
      const getDateOne = new Date(startDate);

      const getFirstDay = this.getFirstDay();
      const getDurationDate = getDateOne.setDate(
        getFirstDay.getDate() + TaskDuration,
      );

      const getSecondDay = new Date(getDurationDate);

      const endDate = [
        getSecondDay.getFullYear(),
        getSecondDay.getMonth() + 1,
        getSecondDay.getDate() - 1,
      ].join('-');
      // console.log("EndDate", endDate);
      return endDate;
    },

    getCurrentItemXCoordinate() {
      const { left } = event.currentTarget.style;
      return left.slice(0, -2);
    },

    getCurrentItemWCoordinate() {
      const { width } = event.currentTarget.style;
      return width.slice(0, -2);
    },

    getCurrentItemYCoordinate() {
      const { top } = event.currentTarget.style;
      // const le = top.slice(0, -2);
      // if((+le < 0)||(+le > 92)){
      //   console.log("Вышел за пределы")
      // }
      // console.log("top" , top)
      return top.slice(0, -2);
    },

    getCurrentDate() {
      // Получаем текущую дату.
      const currentDay = new Date();
      const dateOne = [
        currentDay.getFullYear(),
        currentDay.getMonth() + 1,
        currentDay.getDate(),
      ];
      const OneDate = new Date(dateOne[0], dateOne[1] - 1, dateOne[2]);
      return OneDate;
    },

    getCurrentDateCoords() {
      const currentDay = this.getCurrentDate();
      // Получаем дату начала календаря.
      const FirstCalendarDay = new Date(2018, 0, 1);

      // Количество дней пройденных от начала.
      const numberDay = (currentDay - FirstCalendarDay) / 1000 / 60 / 60 / 24 + 1;

      // Координата к которой будет перемещаться scroll при загрузке.
      const cordX = numberDay * 21 - 880;
      // console.log("cordX", cordX);
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
