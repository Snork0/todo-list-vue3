<template>
  <div>
    <v-form>
      <h2 class="mb-5 text-center">{{ $t("createItem") }}</h2>
      <input-field v-model="title" type="text" :label="$t('name')" />
      <input-field
        v-model="description"
        type="area"
        :label="$t('description')"
      />
      <input-field v-model="deadline" type="date" :label="$t('deadline')" />
    </v-form>

    <styled-button class="d-block mx-auto mt-7" @click="addItem">{{
      $t("add")
    }}</styled-button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import useTodoListStore from "../../store/useTodoListStore";

import StyledButton from "../UI/StyledButton.vue";
import InputField from "../UI/InputField.vue";

const props = defineProps({
  listId: {
    type: [String, Number],
    required: true,
  },
});

const emit = defineEmits(["close-dialog"]);
const store = useTodoListStore();

const title = ref("");
const description = ref("");
const deadline = ref(new Date());

const addItem = () => {
  const todoList = store.todoLists.find((list) => list.id === props.listId);
  let lastItem = todoList.items.at(-1);
  if (!lastItem) {
    lastItem = { id: 0 };
  }

  const item = {
    id: parseInt(lastItem.id) + 1,
    title: title.value,
    description: description.value,
    state: "active",
    deadline: deadline.value.toLocaleDateString("sk-SK").replace(/\s/g, ""),
  };
  store.addTodoItem(props.listId, item);
  emit("close-dialog");
};
</script>

<style scoped lang="scss"></style>
