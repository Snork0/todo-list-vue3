<template>
  <div>
    <h2 class="mb-5 text-center">{{ $t("createList") }}</h2>
    <input-field v-model="name" type="text" :label="$t('name')" />
    <styled-button class="d-block mx-auto mt-7" @click="createTodoList">{{
      $t("add")
    }}</styled-button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import useTodoListStore from "../../store/useTodoListStore";

import StyledButton from "../UI/StyledButton.vue";
import InputField from "../UI/InputField.vue";

const emit = defineEmits(["close-dialog"]);

const store = useTodoListStore();

const name = ref("");

const createTodoList = () => {
  let lastList = store.todoLists.at(-1);
  if (!lastList) {
    lastList = { id: 0 };
  }

  const list = {
    id: parseInt(lastList.id) + 1,
    name: name.value,
    items: [],
  };
  store.addTodoList(list);
  emit("close-dialog");
};
</script>

<style scoped lang="scss"></style>
