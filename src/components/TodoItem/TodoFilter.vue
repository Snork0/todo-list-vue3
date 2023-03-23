<template>
  <div class="d-inline-flex">
    <v-checkbox
      v-model="filterAll"
      :label="$t('all')"
      @change="onChangeAll"
      color="#FCAE1E"
      :indeterminate="checkendNotAll"
      class="px-5"
    ></v-checkbox>
    <v-checkbox
      v-model="filter"
      :label="$t('active')"
      value="active"
      @change="onChangeFilter"
      color="#FCAE1E"
      class="px-5"
    ></v-checkbox>
    <v-checkbox
      v-model="filter"
      :label="$t('done')"
      value="done"
      @change="onChangeFilter"
      color="#FCAE1E"
      class="px-5"
    ></v-checkbox>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, computed } from "vue";

const props = defineProps({
  allFilters: {
    type: Array,
    default: () => [],
  },
});

let filter = ref(props.allFilters);
let filterAll = ref(true);

const emit = defineEmits(["filtered"]);

const checkendNotAll = computed(
  () =>
    props.allFilters.length !== filter.value.length && filter.value.length !== 0
);

const onChangeAll = () => {
  if (filterAll.value) {
    filter.value = props.allFilters;
  } else {
    filter.value = [];
  }
  emit("filtered", filter.value);
};

const onChangeFilter = () => {
  if (filter.value.length === 0) {
    filterAll.value = false;
  } else if (props.allFilters.every((item) => filter.value.includes(item))) {
    filterAll.value = true;
  }
  emit("filtered", filter.value);
};
</script>

<style scoped lang="scss">
:deep() {
  .v-selection-control {
    display: flex;
    flex-direction: column;
  }

  .mdi-minus-box {
    color: #fcae1e;
    opacity: 1 !important;
  }
}
</style>
