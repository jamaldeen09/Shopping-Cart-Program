import ShoppingItem from "./ShoppingItem";
import "./style.css";
import React,{ useState,useEffect } from 'react'

const InnerShoppingContainer = () => {

    // handle product name
    const [ productName,setProductName ] = useState("");

    const handleProductName = (event) => {
        setProductName(event.target.value);
    }

    // handle product price
    const [ productPrice,setProductPrice ] = useState(0);

    const handleProductPrice = (event) => {
        setProductPrice(event.target.value)
    }

    // handle product quantity
    const [ productQuantity,setProductQuantity ] = useState(0);

    const handleProductQuantity = (event) => {
        setProductQuantity(event.target.value)
    }

    // validate product info
    const [ productErrorMessage,setProductErrorMessage ] = useState("");
    const [ priceErrorMessage,setPriceErrorMessage ] = useState("");
    const [ quantityErrorMessage,setQuantityErrorMessage ] = useState("");

    const productValidation = () => {
        if (!productName){
            return false;
        }
        else if (productName.includes(".,/)(*&^%$£@!_-+=")){
            return false;
        }
        else{
            return true;
        }
    }

    const priceValidation = () => {

        
        if (productPrice <= 0){
            return false;
        }
        else{
            return true;
        }
    }

    const quantityValidation = () => {
        
        if (productQuantity <= 0){
            return false;
        }
        else if (productQuantity > 10){
            return false
        }
        else{
            return true;
        }
    }
    // handle clicking / adding to cart
    const [ productInfo,setProductInfo ] = useState([]);
    const [ totalPrice,setTotalPrice ] = useState([]);
    const [ displayPrice,setDisplayPrice ] = useState(0);
    const [ calculatedPrices,setCalcuatedPrice ] = useState([]);

    const handleSubmitProductInfo = () => {

        const validityOfName = productValidation();
        const validityOfPrice = priceValidation();
        const validityOfQuantity = quantityValidation();


        // product info
        const userProductName = productName;
        const userProductPrice = parseInt(productPrice);
        const userProductQuantity = parseInt(productQuantity);


        // conditions for validity
        if (validityOfName && validityOfPrice && validityOfQuantity){

            setProductName("");
            setProductPrice(0);
            setProductQuantity(0);
            setProductErrorMessage("");
            setQuantityErrorMessage("");
            setPriceErrorMessage("");
            const quantityObj = {
                name: userProductName,
                price: userProductPrice,
                quantity: userProductQuantity,
            }

            const totalPriceAndQuantityObj = {
                totalprice: userProductPrice,
                totalquantity: userProductQuantity,
            }

            
            const total = [...totalPrice,totalPriceAndQuantityObj];
            
            
            for (let i = 0; i < total.length; i++){
                const calculation = total[i].totalprice * total[i].totalquantity;
                setCalcuatedPrice((prevCalculatedPrice) => [...prevCalculatedPrice, calculation]);
            }


            const finalTotal = calculatedPrices.reduce((a, b) => {
                return a + b
            })

            setDisplayPrice(finalTotal);
            window.localStorage.setItem("Total", JSON.stringify(finalTotal));

            const addedInfoArr = [...productInfo,quantityObj];
            setProductInfo(addedInfoArr);
            window.localStorage.setItem("Product-information", JSON.stringify(addedInfoArr));
        }

        else{
            if (validityOfName === false){
                setProductErrorMessage("Invalid Product Name");
            }
            else if (validityOfPrice === false){
                setPriceErrorMessage("Invalid Price");
            }
            else{
                setQuantityErrorMessage("Invalid Quantity Amount");
            }
        }
    }

    useEffect(() => {
        const savedInfo = window.localStorage.getItem("Product-information");
        if (savedInfo){
            setProductInfo(JSON.parse(savedInfo));
        }
    },[])

    useEffect (() => {
        const savedTotal = window.localStorage.getItem("Total");
        if (savedTotal){
            setDisplayPrice(JSON.parse(savedTotal));
        }
    },[])

    const [ filteredPandQ,setFilteredPandQ ] = useState([]);
    const [ newPandQ,setNewPandQ ] = useState([]);
    // handle deleting
    const handleItemDelete = (indexToDelete) => {
        const filteredArr = productInfo.filter((_, index) => index !== indexToDelete);
        setProductInfo(filteredArr);

        // filtered arr: [  { price: 90, quantity: 5} , { price: 300, quantity: 2}];

        const total = filteredArr.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setDisplayPrice(total);

        // filtered arr : i hvae name product and undeleted prices
        window.localStorage.setItem("Product-information", JSON.stringify(filteredArr));
       
    }

  return (
    <div className="innerShoppingContainer">
        <h2>Jamals shopping cart</h2>

        <div className="innerContent">
            <div className="inputField">
               <label>Product Name: </label>
               <input type="text" value={productName} onChange={handleProductName}/>

               <div>
                 <p  style={{color: "red"}}>{productErrorMessage}</p>
               </div>
            </div>
           

            <div className="inputField">
                <label>Price: </label>
                <input type="number" value={productPrice} onChange={handleProductPrice}/>

                <div>
                   <p  style={{color: "red"}}>{priceErrorMessage}</p>
                </div>
            </div>

            <div className="inputField">
                <label>Quantity: </label>
                <input type="number" value={productQuantity} onChange={handleProductQuantity}/>

                <div>
                  <p style={{color: "red"}}>{quantityErrorMessage}</p>
                </div>
            </div>
        </div>

        <button className="addButton" onClick={handleSubmitProductInfo}>
                Add
        </button>

        <div className="productContainer">
            {productInfo.map((item, index) => {
                return <ShoppingItem key={index} product={item.name} quantity={item.quantity} price={item.price} onDelete={() => handleItemDelete(index)}/>
            })}
        </div>


        <div>
            <h2>Total Price: ${displayPrice}</h2>
        </div>
    </div>
  )
}

export default InnerShoppingContainer