import React from 'react'
import Badge from 'react-bootstrap/Badge'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Task.css';


function ShowTask({ task, catArr, classArr, handleToggle, deleteTask }) {
  return (
    <div class="task">    
        <div class="content">           
             <input type="text" class="text" value={task.name} readonly />            
        </div>
        <div class="actions">
             <button><Badge bg={classArr[task.category]}>{catArr[task.category]}</Badge></button>   
             <button onClick={()=>handleToggle()} class="edit">Edit</button>
             <button onClick={(e)=>{deleteTask(e, task.id)}} class="delete">Delete</button>         
        </div>
    </div>   
  )
}

export default ShowTask