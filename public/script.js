async function getTodos() {

    const response = await fetch("/api/todos");

    const todos = await response.json();

    const list = document.getElementById("todoList");

    list.innerHTML = "";

    todos.forEach(todo => {

        const li = document.createElement("li");

        li.innerHTML = `
            ${todo.text}
            <button onclick="deleteTodo(${todo.id})">
                Delete
            </button>
        `;

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