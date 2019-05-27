<template>
  <v-app
    class="users"
  >
    <modal
      :show-dialog="showDialogSave"
      :modal-title="formFields.modalTitle"
      :modal-submit-button="formFields.modalSubmitButton"
      @modalConfirm="confirmModalAction"
      @falseDialog="showDialogSave=false"
    >
      <template v-slot:body>
        <div class="reset">
          <select
            v-model="formFields.selectedElement"
            class="select-element"
            @keypress.13.prevent="confirmModalAction"
          >
            <option
              disabled
              value
            >
              Выберите участника
            </option>
            <option
              v-for="item in users"
              :key="item.name"
              :value="item._id"
            >
              {{ item.name }}
            </option>
          </select>
          <reset-button
            @reset="reset"
          />
        </div>
      </template>
    </modal>
    <!--Удаление пользователя-->
    <one-field-modal
      :show-dialog="showDialog"
      :modal-title="formFields.modalTitle"
      :label="formFields.label"
      :modal-submit-button="formFields.modalSubmitButton"
      @modalConfirm="confirmModalAction"
      @falseDialog="showDialog=false"
    >
      <template v-slot:body />
    </one-field-modal>
    <round-add-button
      @editItem="editItem"
    />
    <users-in-project
      :items="currentProjectUsers"
      :controls="controls"
      @deleteItem="deleteItem"
    />
  </v-app>
</template>

<script>
import UsersInProject from './UsersInProject.vue';
import OneFieldModal from '../common/OneFieldModal.vue';
import RoundAddButton from '../button/RoundAddButton.vue';
import ResetButton from '../button/ResetButton.vue';
import Modal from '../common/Modal.vue';


export default {
  name: 'ChangeUsers',
  components: {
    UsersInProject,
    OneFieldModal,
    RoundAddButton,
    ResetButton,
    Modal,
  },
  data() {
    return {
      showDialog: false,
      showDialogSave: false,
    };
  },
  computed: {
    controls() {
      return this.$store.state.ui.DeleteControls;
    },

    users() {
      return this.$store.state.users;
    },

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

    userOnProject() {
      return (this.currentProject && this.currentProject.userId) || [];
    },
  },

  created() {
    this.sendRequest();
  },

  methods: {
    sendRequest() {
      this.$store.dispatch('loadProjects');
    },

    reset() {
      this.formFields.selectedElement = '';
    },

    editItem() {
      this.formFields.modalTitle = 'Добавить участника в проект';
      this.formFields.modalSubmitButton = 'Добавить';
      this.formFields.label = 'Выберите участника';
      this.modalAction = 'Edit';
      this.formFields.userId = this.selectedElement;
      this.id = this.currentProjectId;
      this.formFields.disableInput = false;
      this.showDialogSave = true;
    },

    deleteItem(item) {
      this.formFields.modalTitle = 'Удалить участника из проекта';
      this.formFields.modalSubmitButton = 'Удалить';
      this.formFields.label = 'Удалить участника из проекта';
      this.modalAction = 'Delete';
      this.userId = item._id;
      this.formFields.name = item.name;
      this.id = this.currentProjectId;
      this.formFields.disableInput = true;
      this.showDialog = true;
    },
    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case 'Edit':
          this.saveProject();
          break;
        case 'Delete':
          this.deleteUserFromProject();
          break;
      }
    },

    saveProject() {
      // console.log('Участник добавлен в проект', this.formFields.selectedElement, this.id);
      this.$store.dispatch('addUserToProject', {
        userId: this.formFields.selectedElement,
        id: this.currentProjectId,
      })
        .then(() => {
          this.showDialogSave = false;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error({ err });
        });
    },

    deleteUserFromProject() {
      // console.log('Участник удалён из проекта', this.userId, this.id);
      this.$store.dispatch('deleteUserFromProject', {
        id: this.id,
        userId: this.userId,
      })
        .then(() => {
          this.showDialog = false;
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error({ err });
        });
    },
  },
};
</script>

<style lang="scss">
.button_user {
  left: 5px;
}

.theme--light.application{
background: rgba(234, 231, 220, 1) !important;
}

.reset{
  display: flex;
}
</style>
