import { todoStore } from "../models/todo-store.js";
import { accountsController } from "./accounts-controller.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getCurrentUser(request);
    const viewData = {
      title: "Template 2 Dashboard",
      todolist: await todoStore.getTodosByUserId(loggedInUser._id),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addTodo(request, response) {
    const loggedInUser = await accountsController.getCurrentUser(request);
    const todo = {
      title: request.body.title,
      userId: loggedInUser._id,
    };
    await todoStore.addTodo(todo);
    console.log(`Adding ${todo.title}`);
    response.redirect("/dashboard");
  },

  async deleteTodo(request, response) {
    const todoId = request.params.id;
    await todoStore.deleteTodo(todoId);
    console.log(`Deleting todo ${todoId}`);
    response.redirect("/dashboard");
  },
};
