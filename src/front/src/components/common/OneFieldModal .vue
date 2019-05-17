<template>
  <v-dialog
    v-model="showDialog"
    width="500"
  >
    <template v-slot:activator="click" />
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ modalTitle }}
      </v-card-title>
      <v-card-text>
        <v-form v-model="formValid">
          <slot name="body" />
          <v-text-field
            v-model="formFields.name"
            :disabled="formFields.disableInput"
            :label="formFields.label"
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
          @click="falseDialog"
        >
          {{ 'Отмена' }}
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
</template>

<script>
export default {
  name: 'Modal',
  // eslint-disable-next-line vue/require-prop-types
  props: ['showDialog', 'modalTitle', 'modalSubmitButton', 'label'],
  data() {
    return {
      formValid: false,
      // disableInput: false,
      disableNameUser: false,
    };
  },
  computed: {
    formFields() {
      return this.$store.state.formFields;
    },
  },
  methods: {
    toggleModal() {
      this.$emit('toggleModal');
    },
    confirmModalAction() {
      this.$emit('modalConfirm');
    },
    falseDialog() {
      this.$emit('falseDialog');
    },
  },
};
</script>
<style></style>
