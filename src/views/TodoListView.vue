<template>
  <v-container>
    <modal v-model="showAddTodo" class="px-5"
      ><add-todo-item :listId="todoList.id" @close-dialog="showAddTodo = false"
    /></modal>
    <div class="d-flex justify-space-between">
      <h1>
        <v-icon
          icon="mdi-home"
          size="x-small"
          class="mr-5 mb-1"
          color="#FCAE1E"
          @click="goHome"
        ></v-icon
        >{{ todoList.name }}
      </h1>
      <styled-button @click="showAddTodo = true">{{
        $t("create")
      }}</styled-button>
    </div>
    <hr class="mb-7" />
    <v-row>
      <v-col cols="12" md="7">
        <todo-search @searched="printSearchedTodos" />
      </v-col>
      <v-col cols="12" md="5">
        <todo-filter @filtered="printFilteredTodos" :allFilters="filter" />
      </v-col>
    </v-row>
    <hr class="mb-3" />
    <v-row>
      <v-col cols="12">
        <div v-for="todoItem in todoList.items" :key="todoItem.id" class="my-5">
          <todo-item-card :item="todoItem" :listId="todoList.id" class="pa-5" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import useTodoListStore from "../store/useTodoListStore";

import AddTodoItem from "../components/Forms/AddTodoItem.vue";
import TodoSearch from "../components/TodoItem/TodoSearch.vue";
import TodoFilter from "../components/TodoItem/TodoFilter.vue";
import Modal from "../components/Layout/Modal.vue";
import TodoItemCard from "../components/Layout/TodoItemCard.vue";
import StyledButton from "../components/UI/StyledButton.vue";

const route = useRoute();
const router = useRouter();
const store = useTodoListStore();

const storeTodoList = reactive(await store.getTodoList(route.params.id));

let todoList = ref({ ...storeTodoList });
let showAddTodo = ref(false);
let todoItems = [...storeTodoList.items];
let search = "";
let filter = ["active", "done"];

watch(storeTodoList, () => {
  todoList.value = { ...storeTodoList };
  todoItems = [...storeTodoList.items];
});

const goHome = () => {
  router.push({ name: "TodoListsView" });
};

const filterTodoItems = (search, filter) => {
  if (search === "") {
    todoList.value.items = todoItems.filter((item) =>
      filter.includes(item.state)
    );
  } else {
    const searchedItems = todoItems.filter((todoItem) =>
      String(todoItem.title).includes(search)
    );
    todoList.value.items = searchedItems.filter((item) =>
      filter.includes(item.state)
    );
  }
};

const printSearchedTodos = (searchValue) => {
  search = searchValue;
  filterTodoItems(search, filter);
};

const printFilteredTodos = (filterValue) => {
  filter = filterValue;
  filterTodoItems(search, filter);
};
</script>

<style scoped></style>
