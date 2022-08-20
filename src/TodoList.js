import React, { useState, useEffect } from 'react';
import './TodoList.css';
import Task from './Task';

function TodoList() {

  const [ tasks, setTasks ] = useState([])
  const [ taskName, setTaskName ] = useState("")

  const URL = "http://localhost:9292/"

  let disable = !(taskName)

  const resetForm = () => {
    setTaskName("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();        
    
    // const taskData = {
    //     taskName: taskName,
    //     details: details     
    // };
  }

    // fetch(`${URL}/tasks`, {
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userInfo),
    // })
    //     .then((r) => r.json())
    //     .then((task) => setTasks())
    // }

    useEffect(() => {
        fetch(`${URL}/tasks`)               
        .then((r) => r.json())
        .then((task) => setTasks([...task]))                 
    }, [])

  return (
    <div>
        <header>
            <h1>Task-it</h1>

            <form id="task-form" onSubmit={handleSubmit}>    

                <input onChange={(e)=>taskName(e.target.value)} type="text" id="task-input" placeholder="Enter new task" required />                               
                <button type="submit" id="task-submit" value="Add task" disabled={disable}>Add task</button>

            </form>

        </header>

        <main>
            <div class="task-list">
                <h2>Tasks</h2>

                <div id="tasks">   
                    {tasks.forEach((task, id) => <Task task={task} id={id} />)}
                </div>
            </div>
        </main>
    </div>
  )
}

export default TodoList