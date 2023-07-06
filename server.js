const express = require("express");
const todos = require("./todoList");
const app = express();
const port = 4000;

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});
// add this line
app.use(express.json()); // this allows us to send JSON formatted bodies in our requests
// ... route handlers
// app.listen(...

// List all todos
app.get("/todos", (req, res) => {
  // This will eventually return a list of all todos
  res.send(todos);
});

// Get a specific todo
app.get("/todos/:id", (req, res) => {
  console.log(typeof todos);
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

// update todo
app.patch("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoUpdates = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  const updatedTodo = { ...todos[todoIndex], ...todoUpdates };
  todos[todoIndex] = updatedTodo;
  // console.log("updatedJob", updatedJob);
  res.send(updatedTodo);
});

// Delete a specific todo
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  todos.splice(todoIndex, 1);
  res.send({ message: "Todo deleted successfully" });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Todos API!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
