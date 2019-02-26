<template>
  <v-app id="inspire" class="users">
    <v-card>
      <v-layout row align-end>
        <v-dialog v-model="showDialog" width="500">
          <v-btn
            slot="activator"
            small
            fab
            dark
            color="green lighten-2"
            @click="editItem"
            class="button_user"
          >
            <v-icon dark>add</v-icon>
          </v-btn>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>{{ modalTitle }}</v-card-title>
            <v-card-text>
              <v-form v-model="formValid">
                <v-select
                  v-model="selectedElement"
                  :items="elements"
                  label="Выберите участника"
                  solo
                  item-text="name"
                  item-value="_id"
                ></v-select>
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
    </v-card>



<v-card>
        <v-layout row align-end>
          <v-dialog v-model="UsersDialog" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>{{ modalTitle }}</v-card-title>
              <v-card-text>
                 <v-form v-model="DelUser">
                  <v-select
                    v-model="selectedElement"
                    :items="userOnProject"
                    label="Выберите участника"
                    solo
                    item-text="name"
                    item-value="_id"
                  ></v-select>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" flat @click="UsersDialog = false">Отмена</v-btn>
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












    <user
      :items="currentProjectUsers"
      :controls="controls"
      @deleteItem="deleteItem"
    />
  </v-app>
</template>

<script>
import User from "./User";
export default {
  name: "ChangeProjects",
  data() {
    return {
      showDialog: false,
      formValid: false,
      DelUser: false,
      UsersDialog: false,
      disableInput: false,
      modalTitle: "Добавить нового участника в проект",
      modalSubmitButton: "Сохранить",
      selectedElement: "",
    };
  },
  components: {
    User
  },
  watch: {
    selectedElement(val) {
      console.log(val);
    }
  },
  methods: {
    sendRequest() {
      this.$store.dispatch("loadProjects");
    },
    editItem() {
      this.modalTitle = 'Добавить участника в проект';
      this.modalSubmitButton = 'Добавить';
      this.modalAction = "Edit";
      this.disableInput = false;
      this.showDialog = true;
      this.userId = this.selectedElement;
      this.id = this.currentProjectId;
    },

    deleteItem(item) {
      this.modalTitle = 'Удалить участника';
      this.modalSubmitButton = 'Удалить';
      this.modalAction = 'Delete';
      this.userId = this.selectedUser;
      this.id = this.currentProjectId;
      this.disableInput = true;
      this.UsersDialog = true;
    },


    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case "Edit":
          this.saveProject();
          break;
        case "Delete":
          this.deleteUserOnProject();
          break;
      }
    },
    saveProject() {
      console.log("Участник сохранен", this.userId, this.id);
      this.$store.dispatch("addUserToProject", {
        userId: this.selectedElement,
        id: this.currentProjectId
      });
      this.showDialog = false;
      this.sendRequest();
    },


    deleteUserOnProject() {
      console.log('Участник удалён', this.userId, this.id);
      this.$store.dispatch('deleteUserOnProject', {
         id: this.currentProjectId,
         userId: this.selectedUser,
        });
      this.showDialog = false;
      this.sendRequest();
    },
  },
  computed: {
    elements() {
      return this.$store.getters.users;
    },

    items() {
      return this.$store.getters.projects;
    },

    currentProjectId() {
      return this.$route.params.id;
    },

    currentProject() {
      return this.items.find(item => {
        return item._id === this.currentProjectId;
      });
    },

    controls() {
    return this.$store.state.ui.DelUserControls;
    },

    currentProjectUsers() {
      return (this.currentProject && this.currentProject.users) || [];
    }, 

    userOnProject() {
      return (this.currentProject && this.currentProject.userId) || [];
    }
  },
  created() {
    this.sendRequest();
  }
};
</script>

<style lang="scss">
.button_user {
  &__name {
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
}
</style>