<template>
  <div class="task-list">
    <div
      v-for="(list, index) in taskList"
      :data-id="index"
      ref="taskList"
      class="user-task task-list__item"
    >
      <vue-draggable-resizable
        v-for="item in list"
        :key="item.id"
        :w="item.w"
        :h="item.h"
        :x="item.x"
        :y="item.y"
        :item="item"
        :handles="['ml', 'mr']"
        :grid="[147, 46]"
        @dragstop="onDrag"
        maximize
      >
        <div class="user-task__item" :style="`background: ${item.bgc}`">{{item.text}}</div>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from '../vue-drag/index.js';

let step = 21;

export default {
  name: 'UserTask',
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      taskList: [
        [
          { id: 1, x: 295, y: 0, w: 148, h: 46, bgc: 'rgb(33, 150, 243)', text: 'Задача 10' },
          { id: 2, x: 0, y: 46, w: 148, h: 46, bgc: 'rgb(103, 58, 183)', text: 'Задача 20' }
        ],
        [
          { id: 3, x: step * 4, y: 0, w: 148, h: 46, bgc: 'rgb(150, 252, 44)', text: 'Задача 30' },
          { id: 4, x: 0, y: 46, w: 148, h: 46, bgc: 'rgb(253, 216, 53)', text: 'Задача 40' }
        ],
        [
          { id: 5, x: step * 7, y: 0, w: 148, h: 46, bgc: 'rgb(244, 67, 54)', text: 'Задача 50' },
          { id: 6, x: 0, y: 46, w: 148, h: 46, bgc: 'rgb(77, 208, 225)', text: 'Задача 60' }
        ],
      ],
    }
  },
  methods: {
    onDrag(x, y, item, task) {
      let allTaskListCoords = this.getCoordsTaskList();

      let diffCoords = this.getDiffCoords(allTaskListCoords, task);

      let nearTaskListIndex = this.getNearTaskListIndex(diffCoords);

      this.setTaskInTaskList(nearTaskListIndex, item, task);
    },

    getCoordsTaskList() {
      let coords = [];

      this.$refs.taskList.forEach(taskDiv => {
        let taskDivCoords = taskDiv.getBoundingClientRect();
        coords.push({
          id: taskDiv.dataset.id,
          x: taskDivCoords.left + window.pageXOffset,
          y: taskDivCoords.top + window.pageYOffset,
        })
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
        if(el.diff <= minDemension) {
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

      this.taskList.forEach((list, listIndex) => {
        list.forEach((task, taskIndex) => {
          if (task.id == item.id && listIndex != nearTaskListIndex) {
            this.taskList[listIndex].splice(taskIndex, 1);
            this.taskList[nearTaskListIndex].push(item);
          }
        });
      });
    }
  },
}
</script>

<style lang="scss">
.vue-grid-layout{
  width: 100%;
}
.vue-grid-item{
  background: #ccc;
}
.task-list {
  &__item {
    margin-bottom: 46px;
  }
}
.user-task {
  height: 92px;
  background: rgba(0,0,0,.03);
  display: flex;
  position: relative;
  &__item {
    height: 46px;
    min-width: 20px;
    padding: 10px;
    position: relative;
    box-sizing: border-box;
    z-index: 10;
    cursor: pointer;
    &_blue {
      background: rgb(33, 150, 243);
    }
    &_yellow {
      background: rgb(253, 216, 53);
    }
  }
}
</style>
