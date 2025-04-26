import "./style.css";
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const NotesItemInner = (props) => {
    const { title = "Empty",description = "Empty",randomCol = "white" } = props;


  return (
    <div className="notesItemInner" style={{backgroundColor: randomCol}}>

        <h1 style={{fontWeight: "bold"}}>{title ? title : "Empty"}</h1>

        <div style={{ height: "100%", padding: "10px 0px"}}>
            <p>
                {description ? description : "Empty"}
            </p>
        </div>

        <div style={{display: "flex", gap: "0.9rem"}}>
            <FontAwesomeIcon icon = {faTrashCan} style={{cursor: "pointer"}}/>
            <FontAwesomeIcon icon = {faStar} style={{cursor: "pointer"}} />
        </div>
    </div>
  )
}

export default NotesItemInner