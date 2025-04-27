import "./style.css";
import React, { useState } from 'react'

const ShoppingItem = (props) => {

    const { product,quantity,price,onDelete } = props

    const [ triggerBought,setTriggerBought ] = useState(false);
    const markAsBought = () => {
        setTriggerBought(!triggerBought);
    }
  return (
    <div className="productItem">

        <div className="category">
            <h3>{product} {(triggerBought) ? <span>✅</span> : <span></span>}</h3>
        </div>

        <div className="category">
            <h3>{quantity}</h3>
        </div>

        <div className="category">
            <h3>${price}</h3>
        </div>
        <button className="deleteButton" onClick={() => onDelete()}>Delete</button>
        <button className="deleteButton" onClick={markAsBought} style={{backgroundColor: "gold", color: "black"}}>Mark as bought</button>
    </div>
  )
}

export default ShoppingItem