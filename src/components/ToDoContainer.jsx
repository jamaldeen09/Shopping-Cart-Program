import "./style.css";
import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ToDoItem from "./ToDoItem";
//   <FontAwesomeIcon icon={faCoffee} />

const ToDoContainer = () => {

  // handel users typing
  const [ request,setRequest ] = useState("");

  const handleRequest = (event) => {
    setRequest(event.target.value);
  }

  // handle click and submit

  const [ requestArr,setRequestArr ] = useState(() => {
    const savedArr = window.localStorage.getItem("realTimeRequest");
    return savedArr ? JSON.parse(savedArr) : [];
  })


  // added succesfully trigger

  const [ addedSuccesfully,setAddedSuccesfully ] = useState(false);
  const handleSubmit = () => {

    setRequest("");
    const currRequest = request;
    if (!currRequest.trim()) return;
    setRequestArr((prevRequestArr) => [...prevRequestArr,currRequest]);


    if (currRequest !== null){
      setAddedSuccesfully((prevAddedSuccesfully) => true);
    }
    if (currRequest === null){
      setAddedSuccesfully((prevAddedSuccesfully) => false);
    }
  }

  useEffect(() => {
    window.localStorage.setItem("realTimeRequest", JSON.stringify(requestArr));
  }, [requestArr]);
  
  // handle delete button
  const handleItemDelete = (indexToRemove) => {
    const newArr = requestArr.filter((_,index) => index !== indexToRemove);
    setRequestArr(newArr);
    window.localStorage.setItem("realTimeRequest", JSON.stringify(newArr))
  }
  return (
    <div className="toDoContainer">

        <div className="toDoList">
            <h3>ToDo List <FontAwesomeIcon icon={faBook} /><FontAwesomeIcon style={{transform: "rotate(135deg)"}}icon={faPencil} />  </h3>

            <div className="inputFieldContainer">
                <input type="text" placeholder="Add your task" value={request} onChange={handleRequest}/>
                <button onClick = {handleSubmit} className="addButton"><FontAwesomeIcon icon={faPlus}/></button>
            </div>

            <div className="listContainer">
               <p style={{textAlign: "center", color: (addedSuccesfully) ? "green" : "red"}}>{(addedSuccesfully) ? "To do has been added succesfully" : "To do has not been added"}</p>

               <div className="showListItem">
                 {requestArr.map((item,index) => {
                    return <ToDoItem key={index} to={item} deleteItem={() => handleItemDelete(index)}/>
                 })}
               </div>
            </div>
        </div>
    </div>
  )
}

export default ToDoContainer