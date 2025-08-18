import axios from "axios";
import { useState,useEffect } from "react";

function Positions() {

let [positions,setPositions]=useState([]);



useEffect(()=>{

axios.get("https://stockhive-backend-do5f.onrender.com/allPositions").then((res)=>{
  setPositions(res.data);
});


},[]);



  return (
    <>
      <h5 className="mt-5 mb-3">Positions({positions.length})</h5>
      <table
        style={{
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
        }}
        className="table "
      >
        <tr>
          <th>Product</th>
          <th>Instrument</th>
          <th>Qty</th>
          <th>Avg.</th>
          <th>LTP</th>
          <th>PSL</th>
          <th>Chg</th>
        </tr>

        {positions.map((stocks) => {
    

          const currVal = stocks.price * stocks.qty;
          const isProfit = currVal - stocks.avg * stocks.qty >= 0.0;
                const c = isProfit ? "green" : "red";
     return(
          <tr>
            <td>{stocks.product}</td>
            <td>{stocks.name}</td>
            <td>{stocks.qty}</td>
            <td>{stocks.avg.toFixed(2)}</td>
            <td>{stocks.price.toFixed(2)}</td>
            <td style={{ color: c }}>
              {(currVal - stocks.avg * stocks.qty).toFixed(2)}
            </td>
            <td>{stocks.day}</td>
          </tr>
  
     )

        })}
      </table>
    </>
  );
}

export default Positions;
