const express = require("express");
const todos = require("./todoList");
const app = express();
const port = 4000;

// List all todos
app.get("/todos", (req, res) => {
  // This will eventually return a list of all todos
  res.send(todos);
});

// Get a specific todo
app.get("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todo = todos.find((todo) => todo.id === todoId);
  res.send(todo);
});

// Create a new todo
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  console.log("newTodo", newTodo);
  todos.push(newTodo);
  res.send(newTodo);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Todos API!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
