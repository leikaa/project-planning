<template>
  <div>
    <v-app class="content">
      <v-container>
        <h2>Список участников системы</h2>
        <v-layout
          row
          align-end
        >
          <one-field-modal
            :show-dialog="showDialogUsers"
            :modal-title="formFields.modalTitle"
            :label="formFields.label"
            :modal-submit-button="formFields.modalSubmitButton"
            @modalConfirm="confirmModalAction"
            @falseDialog="showDialogUsers=false"
          >
            <template v-slot:body />
          </one-field-modal>
          <create-button
            post-title="Добавить участника"
            @addItem="addItem"
          />
          <update-status-button
            @sendRequest="sendRequest"
          />
        </v-layout>
        <data-table
          v-if="isShow"
          :headers="headers"
          :items="users"
          :loading="false"
          :transforms="transforms"
          :hide-actions="false"
          :controls="controls"
          @editItem="editItem"
          @deleteItem="deleteItem"
        />
      </v-container>
    </v-app>
  </div>
</template>

<script>
import moment from 'moment';
import DataTable from '../components/DataTable.vue';
import OneFieldModal from '../components/common/OneFieldModal.vue';
import CreateButton from '../components/button/CreateButton.vue';
import UpdateStatusButton from '../components/button/UpdateStatusButton.vue';

export default {
  name: 'TableUser',
  components: {
    DataTable,
    OneFieldModal,
    CreateButton,
    UpdateStatusButton,
  },
  data() {
    return {
      showDialogUsers: false,
    };
  },
  computed: {
    controls() {
      return this.$store.state.ui.defaultControls;
    },

    formFields() {
      return this.$store.state.formFields;
    },

    isShow() {
      return true;
    },

    users() {
      return this.$store.state.users;
    },

    projects() {
      return this.$store.state.projects;
    },

    headers() {
      return [{ text: 'Участники', value: 'name' }];
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
      this.$store.dispatch('loadUsers');
    },

    addItem() {
      this.formFields.modalTitle = 'Добавить нового участника';
      this.formFields.modalSubmitButton = 'Добавить';
      this.formFields.label = 'ФИО участника';
      this.modalAction = 'Add';
      this.formFields.name = '';
      this.formFields.disableInput = false;
      this.showDialogUsers = true;
    },

    editItem(item) {
      this.formFields.modalTitle = 'Редактировать информацию об участнике';
      this.formFields.modalSubmitButton = 'Сохранить';
      this.formFields.label = 'ФИО участника';
      this.modalAction = 'Edit';
      this.id = item._id;
      this.formFields.name = item.name;
      this.UpdateDate = moment().format('MMMM Do YYYY, HH:mm:ss ');
      this.formFields.disableInput = false;
      this.showDialogUsers = true;
    },

    deleteItem(item) {
      this.formFields.modalTitle = 'Удалить участника';
      this.formFields.modalSubmitButton = 'Удалить';
      this.formFields.label = 'ФИО участника';
      this.modalAction = 'Delete';
      this.id = item._id;
      this.formFields.name = item.name;
      this.formFields.disableInput = true;
      this.showDialogUsers = true;
    },

    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case 'Add':
          this.addUser();
          break;
        case 'Edit':
          this.saveUser();
          break;
        case 'Delete':
          this.deleteUser();
          break;
      }
    },

    addUser() {
      // console.log('Участник добавлен', this.formFields.name);
      this.$store.dispatch('createUser', { name: this.formFields.name });
      this.showDialogUsers = false;
    },

    deleteUser() {
      // console.log('Участник удалён', this.formFields.name, this.id);
      this.$store.dispatch('deleteUser', this.id);
      this.showDialogUsers = false;
    },

    saveUser() {
      // console.log('Участник сохранен', this.id, this.formFields.name, this.UpdateDate);
      this.$store.dispatch('saveUser', {
        name: this.formFields.name,
        id: this.id,
        UpdateDate: this.UpdateDate,
      });
      this.showDialogUsers = false;
    },
  },
};
</script>

<style>
.test {
  display: flex;
  flex-flow: row nowrap;
}
.content {
  margin: 70px auto;
}
