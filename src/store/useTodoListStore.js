import { defineStore } from "pinia";
import axiosService from "../services/axiosService";

const useTodoListStore = defineStore("todoList", {
  state: () => ({
    todoLists: [],
  }),
  getters: {
    getTodoList: (state) => async(id) => {
      let todoList = state.todoLists.find(list => list.id === id)
      if (!todoList) {
        [todoList] = (await axiosService.get(`${process.env.API_URL}todoLists?id=${id}`)).data
        state.todoLists.push(todoList);
      }
      return todoList;
    }
  },
  actions: {
    async fetchTodoLists()  {
      this.todoLists = (await axiosService.get(`${process.env.API_URL}todoLists`)).data
    },
    async addTodoList(todoList) {
      this.todoLists.push(todoList);
      await axiosService.post(`${process.env.API_URL}todoLists`, todoList);
    },
    async deleteTodoList(id) {
      this.todoLists = this.todoLists.filter(list => list.id !== id);
      await axiosService.destroy(`${process.env.API_URL}todoLists/${id}`);
    },
    async addTodoItem(listId, todoItem) {
      const todoList = this.todoLists[this.todoLists.findIndex( list => list.id === listId)]
      todoList.items.push(todoItem);
      await axiosService.put(`${process.env.API_URL}todoLists/${listId}`, todoList);
    },
    async deleteTodoItem(listId, itemId) {
      const todoList = this.todoLists.find(list => list.id === listId)
      todoList.items = todoList.items.filter(item => item.id !== itemId);
      await axiosService.put(`${process.env.API_URL}todoLists/${listId}`, todoList);
    },
    async toggleCompleted(listId, itemId) {
      const todoList = this.todoLists.find(list => list.id === listId);
      const todoItem = todoList.items.find(item => item.id === itemId);
      if(todoItem) {
        todoItem.state = todoItem.state === "active" ? "done" : "active";
      }
      await axiosService.put(`${process.env.API_URL}todoLists/${listId}`, todoList);
    },
  },
});

export default useTodoListStore;
