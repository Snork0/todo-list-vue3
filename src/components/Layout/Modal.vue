<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, watch, ref, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const dialog = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    dialog.value = newValue;
  }
);

watch(dialog, () => {
  emit("update:modelValue", dialog.value);
});
</script>

<style scoped lang="scss">
.v-card {
  padding: 2rem;
  background-color: #333333;
  box-shadow: rgba(243, 168, 30, 0.658) 0px 3px 6px,
    rgba(248, 173, 34, 0.486) 0px 3px 6px !important;
  color: #ffffff;
}
</style>
