import "./style.css";
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';


const ToDoItem = ( { to,deleteItem } ) => {

    const [ toggleCompleted,setToggleCompleted ] = useState(false);
    const handleCompletedToDo = () => {
        setToggleCompleted(!toggleCompleted)
    }
  return (
    <div className="toDoItem">
        <h4 style={{textDecoration: (toggleCompleted) ? "line-through": "none"}}>{to}</h4>

        <div className="iconContainer">
           <FontAwesomeIcon onClick={handleCompletedToDo} style={{cursor: "pointer", display: (toggleCompleted) ? "none": "block"}} icon={faPencil} className="iconFont"/>
           <FontAwesomeIcon style={{cursor: "pointer"}} onClick = {() => deleteItem()} icon={faTrashCan} className="iconFont"/>
        </div>
    </div>
  )
}

export default ToDoItem