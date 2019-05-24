<template>
  <div>
    <div class="task-list">
      <div
        v-for="(list, index) in filterTaskListUsers"
        :ref="list._id"
        :key="index"
        :data-id="index"
        :data-name="list.name"
        :data-userId="list._id"
        :style="{ height: `${lineHeigth * list.countLines}px` }"
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
          :data-parentId="list._id"
          :data-id="index"
          maximize
          @mouseup.native="saveTaskToProject(item)"
          @dblclick.native="deleteItem(item)"
        >
          <div
            class="user-task__item"
            :style="`background: ${item.rgb}`"
            :draggable="true"
          >
            <div class="task-text">
              {{ item.name }}
            </div>
          </div>
        </vue-draggable-resizable>
      </div>
    </div>
    <div
      class="unallocatedTasks "
    >
      <vue-draggable-resizable
        v-for="(item, index) in unallocatedTasks"
        :key="item._id"
        :w="item.w"
        :h="item.h"
        :x="item.x"
        :y="item.y"
        :item="item"
        :handles="['ml', 'mr']"
        :grid="[21, 46]"
        :data-parentId="0"
        :data-id="index"
        maximize
        @mouseup.native="saveTaskToNoNameUser(item)"
        @dblclick.native="deleteItem(item)"
      >
        <div
          class="user-task__item"
          :style="`background: ${item.rgb}`"
          :draggable="true"
        >
          <div class="task-text">
            {{ item.name }}
          </div>
        </div>
      </vue-draggable-resizable>
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
import VueDraggableResizable from '../vue-drag/index';
import OneFieldModal from '../common/OneFieldModal.vue';

export default {
  name: 'UserTask',
  components: {
    VueDraggableResizable,
    OneFieldModal,
  },

  data() {
    return {
      showDeleteTask: false,
      lineHeigth: 46,
      h: 138,
    };
  },

  computed: {
    projects() {
      return this.$store.state.projects;
    },

    tasks() {
      return this.$store.state.tasks;
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

    unallocatedTasks() {
      return this.tasks.filter(item => item.projectId === this.currentProjectId && item.userId === '');
    },

    currentProjectUsers() {
      return (this.currentProject && this.currentProject.users) || [];
    },

    filterTaskListUsers() {
      return this.currentProjectUsers.map((item) => {
        item.task = item.task.filter(el => el.projectId === this.currentProjectId);
        item.countLines = 3;
        return item;
      });
    },
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
      const newBlock = this.getIdUserField();
      // console.log("newBlock", newBlock);
      let test = newBlock.id;
      // console.log('test', test);
      if (test === undefined) {
        test = item.userId;
      }
      this.$store.dispatch('saveTaskToProject', {
        id: item.taskId,
        projectId: this.currentProjectId,
        oldUserId: item.userId,
        userId: test,
        // userId: this.getIdUserField(),
        startDate: this.getStartDateFromCoords(),
        endDate: this.getEndDateFromCoords(),
        y: this.newEndDateFromCoords(),
        oldY: this.getCurrentItemYCoordinate(),
        dateUpdate: moment().format('MMMM Do YYYY, HH:mm:ss '),
      });
    },

    saveTaskToNoNameUser(item) {
      const newBlock = this.getIdUserField();
      // console.log(item);
      let test = newBlock.id;
      // console.log('test', test);
      if (test === undefined) {
        test = item.userId;
      }
      this.$store.dispatch('saveTaskToUser', {
        id: item._id,
        projectId: this.currentProjectId,
        oldUserId: item.userId,
        userId: test,
        startDate: this.getStartDateFromCoords(),
        endDate: this.getEndDateFromCoords(),
        y: this.newEndDateFromCoords(),
        oldY: this.getCurrentItemYCoordinate(),
        dateUpdate: moment().format('MMMM Do YYYY, HH:mm:ss '),
      });
    },

    deleteTaskFromUser() {
      // console.log('Задача удалена', this.taskId, this.userId);
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
      const currentY = parseInt(event.currentTarget.style.top, 10);
      return currentY;
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
      const currentY = parseInt(event.currentTarget.style.top, 10);
      const currentBlockId = event.currentTarget.dataset.parentid;
      // console.log('currentBlockId', currentBlockId);
      const blocks = {
        before: [],
        after: [],
        current: {},
      };
      let currentName = 'before';
      this.currentProjectUsers.forEach((item) => {
        const { _id } = item;
        if (currentBlockId === _id) {
          currentName = 'after';
          blocks.current = this.lineHeigth * item.countLines;
          return true;
        }
        blocks[currentName].push({
          id: _id,
          height: this.lineHeigth * item.countLines,
        });
        return true;
      });
      blocks.before = blocks.before.reverse();

      if (currentY < 0 && blocks.before.length > 0) {
        let sum = this.lineHeigth;
        let count = 0;
        const result = {};
        for (const block of blocks.before) {
          count += 1;
          // console.log('iter 1', block, block.height, sum, Math.abs(currentY));
          if (block.height + sum >= Math.abs(currentY)) {
            result.num = count;
            result.id = block.id;
            return result;
          }
          sum += this.lineHeigth + block.height;
        }
      }
      if (currentY > blocks.current && blocks.after.length > 0) {
        let sum = this.lineHeigth + blocks.current;
        let count = 0;
        const result = {};
        for (const block of blocks.after) {
          count += 1;
          // console.log('iter 2', block, block.height, sum, Math.abs(currentY));
          if (block.height + sum >= Math.abs(currentY)) {
            result.num = count;
            result.id = block.id;
            return result;
          }
          sum += this.lineHeigth + block.height;
        }
      }
      return currentBlockId;
    },
    newEndDateFromCoords() {
      const sdf = this.getIdUserField();
      const iter = sdf.num;
      const endY = this.getCurrentItemYCoordinate();
      let result = 0;
      // console.log('iter',iter)
      // console.log('endY',endY)
      if (endY > 92 && endY <= 138) {
        result = 92;
        return result;
      }
      if (endY >= 0 && endY <= 92) {
        return endY;
      }
      if (endY < 0) {
        const perenos = iter * this.h;
        const promejutcki = iter * this.lineHeigth;
        result = endY + perenos + promejutcki;
        if (result === 138) {
          result = 92;
          return result;
        }
        return result;
      } if (endY > this.h) {
        const perenos = iter * this.h;
        const promejutcki = iter * this.lineHeigth;
        result = endY - perenos - promejutcki;
        if (result === 138) {
          result = 92;
          return result;
        }
        return result;
      }
      return result;
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

.unallocatedTasks{
  height: 300px;
  display: flex;
  // position: sticky;
  background: rgba(234, 231, 220, 0.4);
  border: 1px solid rgba(255, 0, 0, 0.2);
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
  width: 430px;
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
