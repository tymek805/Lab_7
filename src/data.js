import axios from "axios";

// Users
export async function getAllUsers() {
    try {
        const users = await axios.get("https://jsonplaceholder.typicode.com/users")
        console.log(users);
        return users.data.map(({id, name, email, username}) => ({
            id: id,
            name: name,
            email: email,
            login: username,
        }))
    } catch (error) {
        throw error
    }
}

export async function getUserById(id) {
    const users = await getAllUsers()
    return users.find(user => user.id.toString() === id.toString())
}

// TODOs
export async function getAllTodos() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos")
    return res.data.map(({ id, title, completed, userId }) => ({
        id: id,
        title: title,
        completed: completed,
        user: userId,
    }))
}

export async function getTodoById(id) {
    const todos = await getAllTodos()
    return todos.find(todo => todo.id.toString() === id.toString())
}

// User & TODOs
export async function getTodosByUserId(userId) {
    const todos = await getAllTodos()
    return todos.filter(todo => todo.user.toString() === userId.toString())
}