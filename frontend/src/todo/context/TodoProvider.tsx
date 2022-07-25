import { useReducer } from "react";
import { TodoContext } from "./TodoContext";
import { Todo, TodoState } from "../interfaces/interfaces";
import { todoReducer } from "./TodoReducer";

const INITIAL_STATE: TodoState = {
    todoCount: 1,
    todos: [
        {
            id: '1',
            desc: "Find infinit stones",
            completed: false
        }
    ],
    completed: 0,
    pending: 1
}

interface props {
    children: JSX.Element | JSX.Element[]
}

export const TodoProvider = ({children}: props) => {
    const [todoState, dispatch] = useReducer (todoReducer, INITIAL_STATE);

    const toggleTodo = (id: string) => {
        dispatch({ type: 'toggleTodo', payload: { id }});
    }

    const addTodo = (todo: Todo) : void => {
        dispatch({ type: "addTodo", payload: todo });
    }

    return (
        <TodoContext.Provider value={{ todoState, toggleTodo, addTodo }}>
            {children}
        </TodoContext.Provider>
    )
}