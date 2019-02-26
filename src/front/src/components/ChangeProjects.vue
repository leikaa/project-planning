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
    <user
      :items="items"
    />
  </v-app>
</template>

<script>
import user from "./User";
export default {
  name: "ChangeProjects",
  data() {
    return {
      showDialog: false,
      formValid: false,
      disableInput: false,
      modalTitle: "Добавить нового участника в проект",
      modalSubmitButton: "Сохранить",
      selectedElement: ""
    };
  },
  components: {
    user
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
      this.modalAction = "Edit";
      this.disableInput = false;
      this.showDialog = true;
      this.userId = this.selectedElement;
      this.id = this.currentProjectId;
    },

    confirmModalAction() {
      const action = this.modalAction;
      switch (action) {
        default:
          break;
        case "Edit":
          this.saveProject();
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
    }
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
