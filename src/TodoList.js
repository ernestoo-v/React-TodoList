import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toogleTodo }) {
    return (
        //Map every element from the todo list
        //We need every element from the list to be unique key, so we use key={todo} that is already unique
        todos.map(todo => {
            return <Todo key={todo.id} toogleTodo={toogleTodo} todo={todo} />
        })
    )
}
