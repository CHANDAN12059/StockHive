import TextField from "@mui/material/TextField";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
function SellWindow({ uid }) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  function setQty(e) {
    setQuantity(e.target.value);
  }

  function setPr(e) {
    setPrice(e.target.value);
  }
  const a = useContext(GeneralContext);

  function handleSell() {

    if(quantity<=0){
        alert("ERROR");
        return;
    }


    axios.post("https://stockhive-backend-do5f.onrender.com/newOrder", {
      name: uid,
      qty: quantity,
      price: price,
      mode: "SELL",
    });

    a.closeSellWindow();
  }

  function handleCancel() {
    a.closeSellWindow();
  }

  return (
    <div className="offset-1 mb-5">
      <div
        className="fields"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
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

        <TextField
          id="outlined-basic"
          variant="outlined"
          className="mb-3"
          value={price}
          onChange={setPr}
          type="number"
          inputProps={{ min: 0 }}
        />
      </div>
      <br></br>

      <div className="btns offset-4">
        <button
          type="button"
          class="btn btn-outline-primary me-3"
          onClick={handleSell}
        >
          Sell
        </button>

        <button
          type="button"
          class="btn btn-outline-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default SellWindow;
