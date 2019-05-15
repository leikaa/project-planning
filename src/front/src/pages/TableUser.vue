<template>
  <div>
    <v-app class="content">
      <v-container>
        <h2>Список участников системы</h2>
        <v-layout
          row
          align-end
        >
          <v-flex xs6>
            <v-dialog
              v-model="showDialog"
              width="500"
            >
              <template v-slot:activator="click">
                <v-btn
                  color="green lighten-2"
                  class="mb15"
                  dark
                  @click="addItem"
                >
                  Добавить
                </v-btn>
              </template>
              <v-card>
                <v-card-title
                  class="headline grey lighten-2"
                  primary-title
                >
                  {{ modalTitle }}
                </v-card-title>
                <v-card-text>
                  <v-form v-model="formValid">
                    <v-text-field
                      v-model="name"
                      label="ФИО участника"
                      :rules="nameRules"
                      :disabled="disableInput"
                      required
                    />
                  </v-form>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="red"
                    flat
                    @click="showDialog = false"
                  >
                    Отмена
                  </v-btn>
                  <v-btn
                    color="green"
                    flat
                    :disabled="!formValid"
                    @click="confirmModalAction"
                  >
                    {{ modalSubmitButton }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              color="blue lighten-2"
              class="mb15"
              dark
              @click="sendRequest"
            >
              Обновить
            </v-btn>
          </v-flex>
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
import DataTable from '../components/DataTable';

export default {
  name: 'TableUser',
  components: {
    DataTable,
  },
  data() {
    return {
      showDialog: false,
      formValid: false,
      id: '',
      name: '',
      nameRules: [v => !!v || 'Название обязательно'],
      disableInput: false,
      modalTitle: 'Добавить нового участника',
      modalSubmitButton: 'Добавить',
      modalAction: '',
    };
  },
  computed: {
    controls() {
      return this.$store.state.ui.defaultControls;
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
      this.modalTitle = 'Добавить нового участника';
      this.modalSubmitButton = 'Добавить';
      this.modalAction = 'Add';
      this.name = '';
      this.disableInput = false;
      this.showDialog = true;
    },

    editItem(item) {
      this.modalTitle = 'Редактировать информацию об участнике';
      this.modalSubmitButton = 'Сохранить';
      this.modalAction = 'Edit';
      this.id = item._id;
      this.name = item.name;
      this.UpdateDate = moment().format('MMMM Do YYYY, HH:mm:ss ');
      this.disableInput = false;
      this.showDialog = true;
    },

    deleteItem(item) {
      this.modalTitle = 'Удалить участника';
      this.modalSubmitButton = 'Удалить';
      this.modalAction = 'Delete';
      this.id = item._id;
      this.name = item.name;
      this.disableInput = true;
      this.showDialog = true;
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
      console.log('Участник добавлен', this.name);
      this.$store.dispatch('createUser', { name: this.name });
      this.showDialog = false;
    },

    deleteUser() {
      console.log('Участник удалён', this.name, this.id);
      this.$store.dispatch('deleteUser', this.id);
      this.showDialog = false;
    },

    saveUser() {
      console.log('Участник сохранен', this.id, this.name, this.UpdateDate);
      this.$store.dispatch('saveUser', {
        name: this.name,
        id: this.id,
        UpdateDate: this.UpdateDate,
      });
      this.showDialog = false;
    },
  },
};
</script>

<style>
.mb15 {
  margin-bottom: 15px;
  text-decoration: none;
  margin: 5px;
  box-sizing: border-box;
  max-width: 150px;
  font-size: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 3px;
  background: rgb(149, 248, 18);
  box-shadow: 0 -3px rgb(149, 248, 18) inset;
}
.content {
  margin: 70px auto;
}
