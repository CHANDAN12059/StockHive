import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import GeneralContext from "./GeneralContext";
import { Link, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";  


function BuyWindow({uid}) {

const [quantity,setQuantity]=useState(1);
const [price,setPrice]=useState(0);


function setQty(e){
  setQuantity(e.target.value);
}

function setPr(e){
  setPrice(e.target.value);
}

function submit(){

  if (quantity < 1) {
    alert("Quantity must be at least 1");
    return;
  }

  axios.post("https://stockhive-backend-do5f.onrender.com/newOrder",{

    name:uid,
    qty:quantity,
    price:price,
    mode:"BUY"
  });
;
  

generalContext.closeBuyWindow();


}








  const generalContext = useContext(GeneralContext);

  function handleCancle() {
   generalContext.closeBuyWindow();
  }




  return (
    <div className="offset-1 mb-5">
      <TextField
        id="outlined-basic"
        label="Qty"
        variant="outlined"
        className="me-3 mb-3"
        value={quantity}
        onChange={setQty}
        error={quantity < 1}     
  helperText={quantity < 1 ? "Quantity must be at least 1" : ""}
        
      />
      <TextField id="outlined-basic" variant="outlined" className="mb-3" value={price}  onChange={setPr} type="number" inputProps={{ min: 0 }}/>
      
      <br></br>

      <div className="btns">
        <span className="me-5">Margin required &#8377; 140.65 </span>
        <button type="button" class="btn btn-outline-primary me-3" onClick={submit}>
          Buy
        </button>
        <button type="button" class="btn btn-outline-secondary" >
        <Link to="#" onClick={handleCancle} style={{textDecoration:"none"}}> Cancel</Link>
        </button>
      </div>
    </div>
  );
}

export default BuyWindow;
