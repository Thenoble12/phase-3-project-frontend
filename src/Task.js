import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Task.css';
import ShowTask from './ShowTask';
import EditTask from './EditTask';

function Task({task, deleteTask, setTasks, tasks}) {

  const [ editToggle, setEditToggle ] = useState(0)
  const [ newTaskName, setNewTaskName ] = useState("")  
  const [ newTaskCategory, setNewTaskCategory ] = useState("default")

  const classArr = ["", "primary", "success", "warning", "info"] 
  const catArr = ["", "Social", "Business", "Work", "Home"]

  const disable = !newTaskName || !newTaskCategory
  const URL = "http://localhost:9292/"

  const handleToggle = () => {
    editToggle ?  setEditToggle(0) : setEditToggle(1)
  }



  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("HERRREEEEE!!!!!!!!!!!!!!!!!!!!!!!!")
      //debugger
      fetch(`${URL}tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: newTaskName,
            details: task.details,
            category: newTaskCategory
        }),
      })
        .then((r) => r.json())
        .then((data) => {
            handleToggle()
            tasks.splice(1, tasks.indexOf(task), {id: task.id, name: newTaskName, details: task.details, category: newTaskCategory, user_id: task.user_id})
            setTasks(tasks)
        });  
  }

  

  return (
    <>
        { editToggle ? <EditTask task={task} disable={disable} catArr={catArr} handleSubmit={handleSubmit} handleToggle={handleToggle} setNewTaskCategory={setNewTaskCategory} newTaskCategory={newTaskCategory} setNewTaskName={setNewTaskName} /> 
                     : <ShowTask task={task} catArr={catArr} classArr={classArr} handleToggle={handleToggle} deleteTask={deleteTask} />
        }
    </>    
  )
}

export default Task