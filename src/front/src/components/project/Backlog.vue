<template>
  <div class="backlog">
    <div class="backlog__item">
      <h2>Список задач проекта</h2>
    </div>
    <create-button
      post-title="Добавить новую задачу"
      @addItem="addItem"
    />
    <template v-if="unallocated">
      <backlog-data
        :items="unallocatedTasks"
        :controls="controls"
        @deleteItem="deleteItem"
        @editItem="editItem"
      />
    </template>
    <template v-if="distributed">
      <backlog-data
        :items="distributedTasks"
        :controls="controls"
        @deleteItem="deleteItem"
        @editItem="editItem"
      />
    </template>
    <v-checkbox
      v-model="unallocated"
      label="Не распределенные задачи"
      class="check"
    />
    <v-checkbox
      v-model="distributed"
      label="Распределенные задачи"
      class="check"
    />
    <modal
      :show-dialog="showCreateTask"
      :modal-title="formFields.modalTitle"
      :modal-submit-button="formFields.modalSubmitButton"
      @modalConfirm="confirmModalAction"
      @falseDialog="showCreateTask=false"
    >
      <template v-slot:body>
        <v-text-field
          v-model="formFields.name"
          label="Название новой задачи"
          :disabled="disableInput"
          :rules="formFields.nameRules"
          required
        />
        <v-text-field
          v-model="formFields.description"
          label="Описание задачи"
          :disabled="disableInput"
          required
        />
        <div class="CheckColor">
          <div
            v-for="(color, index) in colors"
            :key="index"
            class="ColorPicker"
            :style="`background: ${color.color}`"
          >
            <v-checkbox
              v-model="formFields.current"
              height="0px"
              color="white"
              class="CheckboxColorPicker"
              dark
              :value="`${color.color}`"
            />
          </div>
        </div>
        <select
          v-model="formFields.selectedElement"
          class="select-element"
        >
          <option
            disabled
            value
          >
            Список участников проекта
          </option>
          <option
            v-for="item in currentProjectUsers"
            :key="item._id"
            :value="item._id"
          >
            {{ item.name }}
          </option>
        </select>
        <div class="DataPicker">
          <v-date-picker
            v-model="startDate"
            width="220"
          />
          <v-date-picker
            v-model="endDate"
            show-current="false"
            width="230"
          />
        </div>
      </template>
    </modal>
    <!-- Удаление данных -->
    <one-field-modal
      :show-dialog="showDeleteTask"
      :modal-title="formFields.modalTitle"
      :modal-submit-button="formFields.modalSubmitButton"
      @modalConfirm="confirmModalAction"
      @falseDialog="showDeleteTask=false"
    >
      <template v-slot:body />
    </one-field-modal>
    <!-- Изменение данных -->
    <modal
      :show-dialog="ShowEditTask"
      :modal-title="formFields.modalTitle"
      :modal-submit-button="formFields.modalSubmitButton"

      @modalConfirm="confirmModalAction"
      @falseDialog="ShowEditTask=false"
    >
      <template v-slot:body>
        <v-text-field
          v-model="formFields.name"
          :disabled="disableInput"
          label="Название задачи"
          required
        />
        <v-text-field
          v-model="formFields.description"
          label="Описание задачи"
          :disabled="disableInput"
          required
        />
        <div class="CheckColor">
          <div
            v-for="(color, index) in colors"
            :key="index"
            class="ColorPicker"
            :style="`background: ${color.color}`"
          >
            <v-checkbox
              v-model="formFields.rgb"
              height="0px"
              color="white"
              class="CheckboxColorPicker"
              dark
              :value="`${color.color}`"
            />
          </div>
        </div>
        <select
          v-model="formFields.selectedElement"
          class="select-element"
        >
          <option
            disabled
            value
          >
            Выберите владельца задачи
          </option>
          <option
            v-for="item in currentProjectUsers"
            :key="item._id"
            :value="item._id"
          >
            {{ item.name }}
          </option>
        </select>
      </template>
    </modal>
  </div>
</template>

<script>
import moment from 'moment';
// eslint-disable-next-line import/no-unresolved
import BacklogData from './BacklogData';
// eslint-disable-next-line import/no-unresolved
import Modal from '../common/Modal';
// eslint-disable-next-line import/no-unresolved
import OneFieldModal from '../common/OneFieldModal ';
// eslint-disable-next-line import/no-unresolved
import CreateButton from '../button/CreateButton';

export default {
  name: 'Backlog',
  components: {
    BacklogData,
    Modal,
    OneFieldModal,
    CreateButton,
  },

  data() {
    return {
      showCreateTask: false,
      ShowEditTask: false,
      showDeleteTask: false,
      disableInput: false,
      disableNameUser: false,
      unallocated: true,
      distributed: true,
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
    };
  },

  computed: {
    formFields() {
      return this.$store.state.formFields;
    },
    tasks() {
      return this.$store.state.tasks;
    },

    projects() {
      return this.$store.state.projects;
    },

    colors() {
      return this.$store.state.colors;
    },

    currentProjectId() {
      return this.$route.params.id;
    },

    unallocatedTasks() {
      return this.tasks.filter(item => item.projectId === this.currentProjectId && item.userId === '');
    },

    distributedTasks() {
      return this.tasks.filter(item => item.projectId === this.currentProjectId && item.userId != '');
    },

    currentProject() {
      return this.projects.find(item => item._id === this.currentProjectId);
    },

    currentProjectUsers() {
      return (this.currentProject && this.currentProject.users) || [];
    },

    controls() {
      return this.$store.state.ui.taskListControls;
    },
  },

  created() {
    this.sendRequest();
  },

  methods: {
    sendRequest() {
      this.$store.dispatch('loadTasks');
    },

    addItem() {
      this.formFields.modalTitle = 'Добавить новую задачу';
      this.formFields.modalSubmitButton = 'Добавить';
      this.modalAction = 'Add';
      this.projectId = 'currentProjectId';
      this.startDate = this.startDate;
      this.endDate = this.endDate;
      this.y = 0;
      this.formFields.rgb = this.current;
      this.formFields.description = '';
      this.formFields.name = '';
      this.disableInput = false;
      this.showCreateTask = true;
    },

    editItem(item) {
      this.formFields.modalTitle = 'Редактирование задачи';
      this.formFields.modalSubmitButton = 'Сохранить';
      this.modalAction = 'Edit';
      this.id = item._id;
      this.formFields.name = item.name;
      this.formFields.description = item.description;
      this.formFields.rgb = item.rgb;
      this.formFields.oldUserId = item.userId;
      this.formFields.selectedElement = item.userId;
      this.disableInput = false;
      this.ShowEditTask = true;
    },

    deleteItem(item) {
      this.formFields.modalTitle = 'Удалить задачу';
      this.formFields.modalSubmitButton = 'Удалить';
      this.modalAction = 'Delete';
      this.taskId = item._id;
      this.userId = item.userId;
      this.formFields.name = item.name;
      this.disableInput = true;
      this.showDeleteTask = true;
    },

    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case 'Add':
          this.createTask();
          break;
        case 'Edit':
          this.saveTaskListToUser();
          break;
        case 'Delete':
          this.deleteTaskFromUser();
          break;
      }
    },

    createTask() {
      console.log('Задача добавлена', this.formFields.name, this.formFields.description, this.formFields.current);
      this.$store.dispatch('createTask', {
        userId: this.formFields.selectedElement,
        projectId: this.currentProjectId,
        startDate: this.startDate,
        endDate: this.endDate,
        y: this.y,
        rgb: this.formFields.current,
        description: this.formFields.description,
        name: this.formFields.name,
        dateCreate: moment().format('MMMM Do YYYY, HH:mm:ss '),
      });
      this.showCreateTask = false;
    },

    saveTaskListToUser() {
      console.log(
        'Проект сохранен',
        this.id,
        this.formFields.name,
        this.formFields.description,
        this.formFields.oldUserId,
        this.formFields.selectedElement,
        this.formFields.rgb,
      );
      this.$store.dispatch('saveTaskListToUser', {
        id: this.id,
        userId: this.formFields.selectedElement,
        oldUserId: this.formFields.oldUserId,
        name: this.formFields.name,
        description: this.formFields.description,
        rgb: this.formFields.rgb,
      });
      this.ShowEditTask = false;
    },

    deleteTaskFromUser() {
      console.log('Задача удалена', this.taskId, this.userId);
      this.$store.dispatch('deleteTaskFromUser', {
        taskId: this.taskId,
        id: this.userId,
      });
      this.showDeleteTask = false;
    },
  },
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
    // width: 280px;
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
