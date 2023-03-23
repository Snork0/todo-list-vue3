<template>
  <v-btn v-if="variant === 'accept'" class="my-2 pa-0 toggle-complete"
    ><v-icon icon="mdi-check"
  /></v-btn>
  <v-btn v-else class="my-2 pa-0 delete"
    ><v-icon icon="mdi-trash-can-outline"
  /></v-btn>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "accept",
  },
});
</script>

<style scoped lang="scss">
button {
  min-width: 2.5rem;
  width: 2.5rem;
  color: #fcae1e;
  background-color: #555555;
  border: 1px solid #fcae1e;

  &:hover {
    box-shadow: rgba(243, 168, 30, 0.658) 0px 3px 6px,
      rgba(248, 173, 34, 0.486) 0px 3px 6px;
  }
  &.toggle-complete {
    color: rgb(23, 187, 23);
  }

  &.delete {
    color: #f8345b;
  }
}
</style>
