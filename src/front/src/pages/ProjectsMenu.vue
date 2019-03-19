<template>
  <div>
    <v-app id="inspire">
      <data-project 
      :items="projects"
      :controls="controls"
      @editItem="editItem"
      @deleteItem="deleteItem"
      />
      <v-card class="projects">
        <v-layout row align-end>
          <v-dialog v-model="showDialog" width="500">
            <v-btn
              slot="activator"
              color="green  accent-3"
              @click="addItem"
              class="button_create"
              dark
            >Добавить проект</v-btn>
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>{{ modalTitle }}</v-card-title>
              <v-card-text>
                <v-form v-model="formValid">
                  <v-text-field
                    v-model="name"
                    label="Название нового проекта"
                    :rules="nameRules"
                    :disabled="disableInput"
                    required
                  ></v-text-field>
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
    </v-app>
  </div>
</template>


<script>
import DataProject from '../components/DataProject'; 
import moment from 'moment';
export default {
  name: "Project",
  data() {
    return {
      showDialog: false,
      formValid: false,
      id: "",
      name: "",
      nameRules: [v => !!v || "Название обязательно"],
      disableInput: false,
      modalTitle: "Добавить новый проект",
      modalSubmitButton: "Добавить",
      modalAction: ""
    };
  },
  components: {
    DataProject,
  },
  methods: {
    sendRequest() {
      this.$store.dispatch("loadProjects");
    },
    addItem() {
      this.modalTitle = "Добавить новый проект";
      this.modalSubmitButton = "Добавить";
      this.modalAction = "Add";
      this.name = "";
      this.Date = moment().format('MMMM Do YYYY, HH:mm:ss ');
      this.disableInput = false;
      this.showDialog = true;
    },
    editItem(item) {
      this.modalTitle = 'Редактировать информацию о проекте';
      this.modalSubmitButton = 'Сохранить';
      this.modalAction = 'Edit';
      this.id = item._id;
      this.name = item.name;
      this.Date = moment().format('MMMM Do YYYY, HH:mm:ss ');
      this.disableInput = false;
      this.showDialog = true;
    },
    deleteItem(item) {
      this.modalTitle = 'Удалить проект';
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
        case "Add":
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
      console.log("Проект добавлен", this.name, this.Date );
      this.$store.dispatch("addProject", { name: this.name , Date:this.Date});
      this.showDialog = false;
      this.sendRequest();
    },
    deleteProject() {
      console.log('Проект удалён', this.name, this.id);
      this.$store.dispatch('deleteProject', this.id);
      this.showDialog = false;
      this.sendRequest();
    },
    saveProject() {
      console.log('Проект сохранен', this.id, this.name , this.Date );
      this.$store.dispatch('saveProject', { name: this.name, id: this.id , Date: this.Date });
      this.showDialog = false;
      this.sendRequest();
    },  
    updateServersStatus() {
      this.$store.dispatch("loadProjects");
      this.timerId = setTimeout(() => {
        this.updateServersStatus();
      }, 5000);
    }
  },
  computed: {
  controls() {
    return this.$store.state.ui.defaultControls;
  },
  showControls() {
      return this.$props.controls && this.$props.controls.length;
    },
  projects() {
      return this.$store.getters.projects;
    },
  },
  created() {
    this.updateServersStatus();
  },
  beforeDestroy() {
    clearTimeout(this.timerId);
  }
};
</script>

<style>
.button_create {
  text-decoration: none;
  margin: 5px;
  box-sizing: border-box;
  max-width: 150px;
  height: 150px;
}
</style>
