async function getTodos() {

    const response = await fetch("/api/todos");

    const todos = await response.json();

    const list = document.getElementById("todoList");

    list.innerHTML = "";

    todos.forEach(todo => {

        const li = document.createElement("li");

       li.textContent = todo.text;

        const button = document.createElement("button");

        button.textContent = "Delete";
        button.className = "delete-btn";

        button.onclick = () => deleteTodo(todo.id);

        li.appendChild(button);

        list.appendChild(li);
    });
}


async function addTodo() {

    const input = document.getElementById("todoInput");

    const text = input.value;

    if (text === "") {
        return;
    }

    await fetch("/api/todos", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: text
        })
    });

    input.value = "";

    getTodos();
}


async function deleteTodo(id) {

    await fetch(`/api/todos/${id}`, {

        method: "DELETE"

    });

    getTodos();
}


getTodos();