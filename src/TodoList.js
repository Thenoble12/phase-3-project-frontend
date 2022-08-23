import React, { useState, useEffect } from 'react';
import './TodoList.css';
import Task from './Task';

function TodoList() {

  const [ tasks, setTasks ] = useState([])  
  const [ taskName, setTaskName ] = useState("")
  const [ taskUserId, setTaskUserId ] = useState(1)
  const [ taskdetails, setTaskdetails ] = useState("")
  const [ taskCategory, setTaskCategory ] = useState("default")

  const URL = "http://localhost:9292/"
  const disable = !taskName || !taskCategory

  const resetForm = () => {
    setTaskName("")
    setTaskdetails("")
    setTaskCategory("default")
  }

  const handleSubmit = (e) => {
    e.preventDefault();       

    const taskInfo = {
        name: taskName,
        details: taskdetails,
        category: taskCategory,
        user_id: taskUserId,
    }   

    fetch(`${URL}tasks`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskInfo),
    })
        .then((r) => r.json())
        .then((data) => {
            setTasks([...tasks, data])
            resetForm()
        })
    }    

    const handleDelete = (e,id) => {
        e.preventDefault();

        fetch(`${URL}tasks/${id}`, {
            method: "DELETE",
        })
       .then((r) => r.json())
       .then((deleted) => { 
        const newTasks = tasks.filter((task) => deleted.id !== task.id)     
        setTasks(newTasks) 
       })        
    }    

    useEffect(() => {
        fetch(`${URL}tasks`)               
        .then((r) => r.json())
        .then((tasksData) => {setTasks(tasksData)
                              console.log(tasks)
        })               
    }, [])

    

   return (
     <div>
        <header>
            
            <h1>Task-it</h1>
            <form id="task-form" onSubmit={handleSubmit}>    

                <input onChange={(e)=>setTaskName(e.target.value)} type="text" id="task-input" placeholder="Enter new task" required />                                               
                
                <select name="category" id="task-category-select" value={taskCategory} onChange={(e)=>setTaskCategory(e.target.value)} defaultValue="default" placeholder="-select-" required>
                    <option value="default" disabled>Select Category</option>
                    <option value="1">Social</option>
                    <option value="2">Business</option>
                    <option value="3">Work</option>
                    <option value="4">Home</option>
                </select>

                <button type="submit" id="task-submit" value="Add task" disabled={disable}>Add task</button>        
            </form>

        </header>

        <main>
            <section class="task-list">                
                <h2>Tasks</h2>
                <div id="tasks">                       
                    { tasks.map((task, id) => <Task task={task} id={id} deleteTask={handleDelete} setTasks={setTasks} tasks={tasks}/> ) }                   
                </div>
            </section>
        </main>
    </div>
  )
}

export default TodoList