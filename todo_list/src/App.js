import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  
    // Edit the task
    const [todoEditing, setTodoEditing] = React.useState(null)
    const [editingText, setEditingText] = React.useState("")

   React.useEffect(()=>{
       const json = localStorage.getItem("todos");
       const loadedTodos = JSON.parse(json);
       if(loadedTodos){
           setTodos(loadedTodos);
       }
   },[]);
    React.useEffect(()=>{
        if(todos.length > 0){
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        }
    },[todos]);
    
  // Add the handlesubmit code here
  function handleSubmit(e){
      e.preventDefault()
      const newTodo = {
          id: new Date().getTime(),
          text: todo.trim(),
          completed: false,
      }

      if(newTodo.text.length > 0){
          setTodos([...todos].concat(newTodo));
          setTodo("");
      }else{
          alert("enter the task")
          setTodo("");
      }
  }
  
  // Add the deleteToDo code here
  function deleteToDo(e){
      console.log(e);
        let updatedtodos = todos.filter((opt)=> opt.id !== e)
        setTodos(updatedtodos)
  }
  
  // Add the toggleComplete code here
  function toggleComplete(e){
        let updatedTodo = todos.map((todo)=>{
            console.log(todo);
          if(todo.id === e){
              todo.completed = true;
          }
          return todo;
      });
      setTodos(updatedTodo)


  }
  
  // Add the submitEdits code here
  function submitEdits(e){
    const updatedTodos = todos.map((todo)=>{
        if(todo.id === e ){
            todo.text = editingText;
        }
        return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }
  
return(
<div className ="App">
<h1>Todo List</h1>
<form onSubmit={handleSubmit}>
<input type ="text" align ="right" onChange={(e)=>{
    setTodo(e.target.value)
}} value={todo} placeholder="add the task"/>
<button type ="submit">Add Todo</button>
</form>

{todos.map((todo)=> 
    <div key={todo.id} className = "todo">
        <div className = "todo-text">
            <input type="checkbox" checked={todo.completed} onChange={()=>toggleComplete(todo.id)}/>
            {todo.id === todoEditing ? (
                <input type="text" onChange={(e)=> setEditingText(e.target.value)} />
            ):(
                <div>{todo.text}</div>
            )}
        </div>
        <div className = "todo-actions">
            {todo.id === todoEditing ? (
             <button onClick={()=>submitEdits(todo.id)}>Submit</button>  
            ):(
                <button onClick={()=>setTodoEditing(todo.id)}>Edit</button>
            )}
        <button onClick={()=>deleteToDo(todo.id)} >Delete</button>
        </div>
    </div>
)}
</div>
);
};
export default App;
