import React from 'react'

function EditTask({ task, disable, catArr, handleSubmit, setNewTaskCategory, newTaskCategory, setNewTaskName, handleToggle }) {
  return (
    <div class="task">    
        <form id="task-form" onSubmit={handleSubmit}>
            <div class="content">           
                <input onChange={(e)=>setNewTaskName(e.target.value)} type="text" id="task-input" placeholder={task.name} required />
            </div>
            <div class="actions">
                <select name="category" id="task-category-select" value={newTaskCategory} onChange={(e)=>setNewTaskCategory(e.target.value)} defaultValue={task.category} placeholder={catArr[task.category]} required>
                                    <option value="default" disabled>Select Category</option>
                                    <option value="1">Social</option>
                                    <option value="2">Business</option>
                                    <option value="3">Work</option>
                                    <option value="4">Home</option>
                </select>   
                <button type="submit" id="task-submit" disabled={disable}>Submit</button>  
                <button onClick={()=>{handleToggle()}} class="delete">Cancel</button>         
            </div>
        </form>       
    </div>  
  )
}

export default EditTask