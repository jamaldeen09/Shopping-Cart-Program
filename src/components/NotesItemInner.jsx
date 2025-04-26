import "./style.css";
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const NotesItemInner = (props) => {
    const { title = "Empty",description = "Empty",randomCol = "white",deleteNote } = props;

    const [ toggleFav,setToggleFav ] = useState(false);

    const handleToggling = () => {
        setToggleFav(!toggleFav)
        console.log(toggleFav);
    }
  return (
    <div className="notesItemInner" style={{backgroundColor: randomCol}}>

        <h1 style={{fontWeight: "bold"}}>{title ? title : "Empty"}</h1>

        <div style={{ height: "100%", padding: "10px 0px"}}>
            <p>
                {description ? description : "Empty"}
            </p>
        </div>

        <div style={{display: "flex", gap: "0.9rem"}}>
            <FontAwesomeIcon onClick={() => deleteNote()} icon = {faTrashCan} style={{cursor: "pointer"}}/>
            <FontAwesomeIcon onClick={handleToggling} icon = {faStar} style={{cursor: "pointer", color: (toggleFav) ? "gold" : "black"}} />
        </div>
    </div>
  )
}

export default NotesItemInner