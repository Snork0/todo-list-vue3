import { createRouter, createWebHistory } from 'vue-router';
import TodoListsView from "../views/TodoListsView.vue";
import TodoListView from '../views/TodoListView.vue';

const routes = [
  {
    path: '/',
    name: 'TodoListsView',
    component: TodoListsView,
  },
  {
    path: '/todo-list/:id',
    name: 'TodoListView',
    component: TodoListView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;