<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="false"
      :rows-per-page-items="defaultPagination"
      class="elevation-1"
      :total-items="totalItems"
      :disable-initial-sort="disableInitialSort"
      :hide-actions="hideActions"
      no-data-text="Нет данных"
      @update:pagination="$emit('update:pagination', $event)"
      :headers-length="2"
    >
      >
      <template v-slot:progress>
        <v-progress-linear
          color="blue"
          indeterminate
          :active="loading"
        />
      </template>
      <template v-slot:items="props">
        <td
          v-for="(field, index) in visibleHeaders"
          :key="props.index + '_' + index"
          :data-key="props.index + '_' + index"
          :class="getClassName(field)"
          @click="click(props)"
        >
          {{ getTransformedValue(field.value, props.item[field.value]) }}
        </td>
        <td
          class="right layout px-0s table-controls"
          :class="{invisible: !showControls}"
        >
          <v-btn
            v-for="(control, controlIndex) in controls"
            :key="props.index + '_' + controlIndex"
            class="mx-0"
            icon
            @click="emit(control.emit, props.item)"
          >
            <v-icon :color="control.color">
              {{ control.icon }}
            </v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      default: null,
    },
    items: {
      type: Array,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: Array,
      default: null,
    },
    transforms: {
      type: Object,
      default() {
        return { message: 'Ошибка данных' };
      },
    },
    totalItems: {
      type: String,
      default: null,
    },
    disableInitialSort: {
      type: String,
      default: null,
    },
    hideActions: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showControls() {
      return this.$props.controls && this.$props.controls.length;
    },

    visibleHeaders() {
      return this.headers.reduce((carry, item) => {
        if (!item.invisible) {
          carry.push(item);
        }
        return carry;
      }, []);
    },

    defaultPagination() {
      return this.$store.state.project.ui.defaultPagination;
    },
  },
  methods: {
    getClassName(header) {
      if (!header.align) {
        return '';
      }
      return `text-xs-${header.align}`;
    },

    click(props) {
      this.$emit('click', props.item, props.index);
    },

    emit(emit, item) {
      // console.log('emit', emit, item);
      this.$emit(emit, item);
    },

    getTransformedValue(filter, value) {
      if (this.transforms && this.transforms[filter]) {
        return this.transforms[filter](value);
      }
      return value;
    },
  },
};
</script>

<style>
.table-controls.invisible {
  display: none;
}
.v-table td {
  cursor: pointer;
}
</style>
