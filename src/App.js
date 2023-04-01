//allows us to use refs from the html code
//Use efect: Store local values
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
// import uuidv4 from 'uuid/v4';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEYS = 'todoApp.todos'

function App() {
  // const [todos, setTodos] = useState([])
  // const [todos, setTodos] = useState(['Todo 1', 'Todo 2']);

  //We are gonna create an object for every toDo, with id=1 and complete=false: If it check or not;
  // const [todos, setTodos] = useState([{ id: 1, name: 'Todo1', complete: true }]);

  //We will leave it emty becouse we dont want any default todo in the list
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  //With this effect we can set the todo list with the local storage values that are saved in the local Storage Key, we have to parse the localStorage that is a string to an aray using JSON.

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS))
    if (storedTodos) setTodos(storedTodos);
  }, [])

  //Storage the new todo element in local, but while refresing the page still dissapear, so we need to use another function before^^^^^
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS, JSON.stringify(todos))
  }, [todos])

  function toogleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  //We have to use the UseRef import in the import, that allows us to use refs from the html code
  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    //In order to have differents ids we need to install a library called UUID. in the terminal using npm i uuid
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => todo.complete)
    setTodos(newTodos)
  }
  return (
    <>
      <TodoList todos={todos} toogleTodo={toogleTodo} />

      {/* create a ref to the input value declared in a const */}
      <input ref={todoNameRef} type="text" />
      {/* //Set an event listener on object called handleAddTodo */}
      <button onClick={handleAddTodo}>Add To</button>
      <button onClick={handleClearTodos}>Clear List</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>

    </>
  )
}
export default App;