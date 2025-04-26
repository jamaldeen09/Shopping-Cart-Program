
import NotesItemInner from "./NotesItemInner";
import "./style.css";
import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger } from "@fortawesome/free-solid-svg-icons/faHamburger";

const NotesContainer = () => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    // handle title 
    const [ userTitle,setUserTitle ] = useState("");

    const handleTitle = (event) => {
        setUserTitle(event.target.value);
    }

    // handle description
    const [ userDescription,setUserDescription ] = useState("");

    const handleDescription = (event) => {
        setUserDescription(event.target.value)
    }

    // handle storage

    const [ notesArr,setNotesArr ] = useState([]);
    const [colorArr, setColorArr ] = useState([
        "blue",
        "red",
        "violet",
        "orange",
    ]);

    const handleAdding = () => {
        setUserTitle("");
        setUserDescription("");

        // title descrition and color
        const currTitle = userTitle;
        const currDescrip = userDescription;

        if (!currTitle.trim() && !currDescrip.trim()) return;

        const randomIndex = Math.floor(Math.random() * colorArr.length);
        const randomColor = colorArr[randomIndex];

        const userInfoObj = {
            submittedTitle: currTitle,
            submittedDescription: currDescrip,
            color: randomColor,
        }

        const updatedNotes = [...notesArr,userInfoObj];
        setNotesArr(updatedNotes);
        window.localStorage.setItem("userNotesInfo", JSON.stringify(updatedNotes));
    }

    // useState effect for storing
    useEffect(() => {
        const savedArr = window.localStorage.getItem("userNotesInfo");
        if (savedArr) {
           setNotesArr(JSON.parse(savedArr));
        }
    },[])

    // handle deleting
    const handleDeleting = (indexToRemoved) => {
        const newArr = notesArr.filter((_,index) => index !== indexToRemoved);

        setNotesArr(newArr);
        window.localStorage.setItem("userNotesInfo", JSON.stringify(newArr));
    }

  return (
    <div className="notesContainer">

        {/* typing div */}
        <div className="userInputContainer">
            <h2><span style={{color: "orange"}}>No</span>tes</h2>

            <div className="innerInputCon">
               <input type="text" placeholder="Title" value={userTitle} onChange={handleTitle}/>
               <textarea rows="10" placeholder="Description" value={userDescription} onChange={handleDescription}>
               </textarea>

               <button onClick={handleAdding}>Add Note</button>
            </div>

            <div className="availableColors">
               <h5>Colors:</h5>
               <div className="color blue"></div>
               <div className="color red"></div>
               <div className="color violet"></div>
               <div className="color orange"></div>
            </div>
        </div>


        {/* display div */}
        <div className="resultContainer">
            {notesArr.map((item, index) => {
                return <NotesItemInner  deleteNote={ () => handleDeleting(index) } randomCol = {item.color} key={index} title={item.submittedTitle} description={item.submittedDescription} />
            })}
        </div>
    </div>
  )
}

export default NotesContainer