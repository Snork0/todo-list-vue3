<template>
  <div>
    <modal v-model="showAddTodo" class="px-5"
      ><add-todo-list @close-dialog="showAddTodo = false"
    /></modal>
    <div class="d-flex mt-5 justify-space-between">
      <h1 class="text-center">{{ $t("todoLists") }}</h1>
      <styled-button class="ml-5" @click="showAddTodo = true">{{
        $t("create")
      }}</styled-button>
    </div>
    <hr class="mb-3" />
    <v-container>
      <v-row>
        <v-col cols="12" class="px-0" v-for="list in todoLists" :key="list.id">
          <div class="d-flex justifu-center align-center">
            <v-card @click="openTodoList(list.id)">
              <h2>{{ list.name }}</h2>
            </v-card>
            <inner-button
              variant="delete"
              @click="deleteTodoList(list.id)"
              class="ml-5"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useTodoListStore from "../store/useTodoListStore";

import StyledButton from "../components/UI/StyledButton.vue";
import Modal from "../components/Layout/Modal.vue";
import AddTodoList from "../components/Forms/AddTodoList.vue";
import InnerButton from "../components/UI/InnerButton.vue";

const router = useRouter();
const store = useTodoListStore();

await store.fetchTodoLists();

const todoLists = ref(store.todoLists);
const showAddTodo = ref(false);
const columns = ref(1);

watch(
  () => store.todoLists,
  (newVal) => {
    todoLists.value = newVal;
  }
);

const openTodoList = (listId) => {
  router.push({ name: "TodoListView", params: { id: listId } });
};

const deleteTodoList = (listId) => {
  store.deleteTodoList(listId);
};
</script>

<style scoped>
.v-card {
  background-color: #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
