<template>
  <div>
    <v-app id="inspire">
      <project-data
        :items="projects"
        :controls="controls"
        @editItem="editItem"
        @deleteItem="deleteItem"
      />
      <create-button
        post-title="Добавить проект"
        @addItem="addItem"
      />
      <v-card class="projects">
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
      </v-card>
    </v-app>
  </div>
</template>


<script>
import moment from 'moment';
// eslint-disable-next-line import/no-unresolved
import OneFieldModal from '../common/OneFieldModal ';
// eslint-disable-next-line import/no-unresolved
import ProjectData from './ProjectData';
// eslint-disable-next-line import/no-unresolved
import CreateButton from '../button/CreateButton';

export default {
  name: 'Project',
  components: {
    OneFieldModal,
    ProjectData,
    CreateButton,
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
  },
  created() {
    this.sendRequest();
  },
  methods: {
    sendRequest() {
      this.$store.dispatch('loadProjects');
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
      console.log('Проект добавлен', this.formFields.name, this.CreationDate);
      this.$store.dispatch('createProject', {
        name: this.formFields.name,
        CreationDate: this.CreationDate,
      });
      this.showDialogProject = false;
    },

    deleteProject() {
      console.log('Проект удалён', this.formFields.name, this.id);
      this.$store.dispatch('deleteProject', this.id);
      this.showDialogProject = false;
    },

    saveProject() {
      console.log('Проект сохранен', this.id, this.formFields.name, this.Date);
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
