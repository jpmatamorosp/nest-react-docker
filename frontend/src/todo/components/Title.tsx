import { ChangeEvent, EventHandler, useState } from "react";
import { useTodos } from "../hooks/useTodos"

export const Title = () => {
    const { pendingTodos, addTodo } = useTodos();
    const [todoDesc, setTodoDesc] = useState('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        addTodo({
            id: '2',
            desc: todoDesc,
            completed: false
        });
    }

    const handleChange = ({target: { value }}: ChangeEvent<HTMLInputElement>) => {
        setTodoDesc(value);
    }

    return (
        <>
            <h1>
                Todos: { pendingTodos }
            </h1>
            <form onSubmit={handleSubmit}>
                <label>New Todo</label>
                <input type="text" name="todo" id="todo" value={todoDesc} onChange={handleChange}/>
                <button type="submit">Add</button>
            </form>
        </>
    )
}