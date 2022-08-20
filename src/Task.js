import React from 'react'

function Task({ taskData }) {

 const { name, details, category, dateTime } = taskData

  return (
    <div class="task">

        <div class="content">
            <input type="text" class="text" value={name} readonly />
        </div>

        <div class="details">
            <input type="text" class="text" value={details} readonly />
        </div>

        <div class="catagory">
            <input type="text" class="text" value={details} readonly />
        </div>

        <div class="actions">
            <button class="edit">Edit</button> 
            <button class="delete">Delete</button>
        </div>

    </div>   
  )
}

export default Task