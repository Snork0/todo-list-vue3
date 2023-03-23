<template>
  <div>
    <v-text-field
      v-model="searchValue"
      @keyup="findSearch(searchValue)"
      variant="solo"
    ></v-text-field>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const searchValue = ref("");

const emit = defineEmits(["searched"]);

const findSearch = (search) => {
  emit("searched", search);
};
</script>

<style scoped lang="scss">
:deep(.v-field) {
  background-color: #777777;
  color: #ffffff;
}
</style>
