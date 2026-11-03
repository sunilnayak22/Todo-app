const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let todos = [
    { id: 1, text: "Learn Node.js" },
    { id: 2, text: "Build a backend project" }
];

// GET - get all todos
app.get("/api/todos", (req, res) => {
    res.json(todos);
});

// POST - add a todo
app.post("/api/todos", (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text
    };

    todos.push(newTodo);

    res.json(newTodo);
});

// DELETE - delete a todo
app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    todos = todos.filter(todo => todo.id !== id);

    res.json({ message: "Todo deleted" });
});

module.exports = app;