import React, { useEffect, useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Task.css';

function Task({task, deleteTask}) {

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

      fetch(`${URL}tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: newTaskName,
            details: task.details,
            category:  newTaskCategory
        }),
      })
        .then((r) => r.json())
        .then((data) => {
            handleToggle()
        });  
  }

  

  return (
    <div class="task">

        <form id="task-form" onSubmit={handleSubmit}>
            <div class="content">           
                { editToggle 
                    ? <input onChange={(e)=>setNewTaskName(e.target.value)} type="text" id="task-input" placeholder={task.name} required />
                    : <input type="text" class="text" value={task.name} readonly />
                }
            </div>
            <div class="actions">
                { editToggle 
                    ? <select name="category" id="task-category-select" value={newTaskCategory} onChange={(e)=>setNewTaskCategory(e.target.value)} defaultValue={task.category} placeholder={catArr[task.category]} required>
                            <option value="default" disabled>Select Category</option>
                            <option value="1">Social</option>
                            <option value="2">Business</option>
                            <option value="3">Work</option>
                            <option value="4">Home</option>
                        </select>               
                    : <button><Badge bg={classArr[task.category]}>{catArr[task.category]}</Badge></button>
                }
            </div>
                { editToggle
                    ? <button type="submit" id="task-submit" value="Edit task" disabled={disable}>Submit</button>
                    : null
                }
        </form>

        <div class="actions">
               { editToggle
                    ?  null  
                    :  (<>
                            <button onClick={()=>handleToggle()} class="edit">Edit</button>
                            <button onClick={(e)=>{deleteTask(e, task.id)}} class="delete">Delete</button>
                        </>)                          
               }
        </div>

    </div>   
  )
}

export default Task