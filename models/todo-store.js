import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("todos");

export const todoStore = {
  async getAllTodos() {
    await db.read();
    return db.data.todos;
  },

  async addTodo(todo) {
    await db.read();
    todo._id = v4();
    db.data.todos.push(todo);
    await db.write();
    return todo;
  },

  async getTodoById(id) {
    await db.read();
    const todo = db.data.todos.find((todo) => todo._id === id);
    return todo;
  },

  async getTodosByUserId(userId) {
    await db.read();
    const todos = db.data.todos.filter((todo) => todo.userId === userId);
    return todos;
  },

  async deleteTodo(id) {
    await db.read();
    const index = db.data.todos.findIndex((todo) => todo._id === id);
    db.data.todos.splice(index, 1);
    await db.write();
  },

  async deleteAllTodos() {
    db.data.todos = [];
    await db.write();
  },
};
