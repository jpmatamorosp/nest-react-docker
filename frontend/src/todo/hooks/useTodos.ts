import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"

export const useTodos = () => {
    const { todoState, toggleTodo, addTodo } = useContext(TodoContext);
    const { todos } = todoState;

    return {
        todos,
        pendingTodos: todos.filter(todo => !todo.completed).length,
        toggleTodo,
        addTodo
    }
}