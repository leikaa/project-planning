<template>
  <div>
    <v-app class="content">
      <v-container>
        <h2>Список проектов системы</h2>
        <v-layout
          row
          align-end
        >
          <one-field-modal
            :show-dialog="showDialogProject"
            :modal-title="formFields.modalTitle"
            :label="formFields.label"
            :modal-submit-button="formFields.modalSubmitButton"
            @modalConfirm="confirmModalAction"
            @falseDialog="showDialogProject=false"
          >
            <template v-slot:body />
          </one-field-modal>
          <create-button
            post-title="Добавить проект"
            @addItem="addItem"
          />
          <update-status-button
            @sendRequest="sendRequest"
          />
        </v-layout>
        <data-table
          v-if="isShow"
          :headers="headers"
          :items="projects"
          :loading="false"
          :transforms="transforms"
          :hide-actions="false"
          :controls="controls"
          @click="clickItem"
          @editItem="editItem"
          @deleteItem="deleteItem"
        />
      </v-container>
    </v-app>
  </div>
</template>


<script>
import moment from 'moment';
import OneFieldModal from '../components/common/OneFieldModal.vue';
import DataTable from '../components/DataTable.vue';
import CreateButton from '../components/button/CreateButton.vue';
import UpdateStatusButton from '../components/button/UpdateStatusButton.vue';

export default {
  name: 'Project',
  components: {
    OneFieldModal,
    DataTable,
    CreateButton,
    UpdateStatusButton,
  },
  data() {
    return {
      showDialogProject: false,
      disableInput: false,
    };
  },
  computed: {
    controls() {
      return this.$store.state.ui.defaultControls;
    },

    projects() {
      return this.$store.state.projects;
    },

    formFields() {
      return this.$store.state.formFields;
    },

    isShow() {
      return true;
    },

    headers() {
      return [{ text: 'Проекты', value: 'name' }];
    },

    transforms() {
      return {
        updateAt(value) {
          return value.toString();
        },
      };
    },
  },
  created() {
    this.sendRequest();
  },
  methods: {
    sendRequest() {
      this.$store.dispatch('loadProjects');
    },

    clickItem(item) {
      this.id = item._id;
      this.$router.push({ name: 'Project', params: { id: item._id } });
    },

    addItem() {
      this.formFields.modalTitle = 'Добавить новый проект';
      this.formFields.modalSubmitButton = 'Добавить';
      this.formFields.label = 'Название проекта';
      this.modalAction = 'Add';
      this.formFields.name = '';
      this.CreationDate = moment().format('MMMM Do YYYY, HH:mm:ss ');
      this.formFields.disableInput = false;
      this.showDialogProject = true;
    },

    editItem(item) {
      this.formFields.modalTitle = 'Редактировать информацию о проекте';
      this.formFields.label = 'Название проекта';
      this.formFields.modalSubmitButton = 'Сохранить';
      this.modalAction = 'Edit';
      this.id = item._id;
      this.formFields.name = item.name;
      this.Date = moment().format('MMMM Do YYYY, HH:mm:ss ');
      this.formFields.disableInput = false;
      this.showDialogProject = true;
    },

    deleteItem(item) {
      this.formFields.modalTitle = 'Удалить проект';
      this.formFields.label = 'Название проекта';
      this.formFields.modalSubmitButton = 'Удалить';
      this.modalAction = 'Delete';
      this.id = item._id;
      this.formFields.name = item.name;
      this.formFields.disableInput = true;
      this.showDialogProject = true;
    },

    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case 'Add':
          this.addProject();
          break;
        case 'Edit':
          this.saveProject();
          break;
        case 'Delete':
          this.deleteProject();
          break;
      }
    },

    addProject() {
      // console.log('Проект добавлен', this.formFields.name, this.CreationDate);
      this.$store.dispatch('createProject', {
        name: this.formFields.name,
        CreationDate: this.CreationDate,
      });
      this.showDialogProject = false;
    },

    deleteProject() {
      // console.log('Проект удалён', this.formFields.name, this.id);
      this.$store.dispatch('deleteProject', this.id);
      this.showDialogProject = false;
    },

    saveProject() {
      // console.log('Проект сохранен', this.id, this.formFields.name, this.Date);
      this.$store.dispatch('saveProject', {
        name: this.formFields.name,
        id: this.id,
        Date: this.Date,
      });
      this.showDialogProject = false;
    },
  },
};
</script>

<style>
</style>
