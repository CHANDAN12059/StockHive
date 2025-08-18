import { holdings } from "./data/data";
import axios from "axios";
import { useEffect,useState } from "react";
import VerticalGraph from "./VerticalGraph";

function Holdings() {

const [holdings,setHoldings]=useState([]);

const labels = [];


holdings.map((e)=>{
  labels.push(e.name);
})

// const labels = holdings.map(e => e.name);






 const data = {
  labels,
  datasets: [
    {
      label: 'Stock Price',
      data: holdings.map((e) => e.price),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },

  ],
};












useEffect(()=>{

axios.get("https://stockhive-backend-do5f.onrender.com/allHoldings").then((res)=>{
  setHoldings(res.data);
});




},[]);





  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h5>Holdings ({holdings.length})</h5>
        <table
          className="table table-borderless"
          style={{
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
          }}
        >
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg</th>
              <th>Day chg</th>
            </tr>
          </thead>

          {holdings.map((stocks) => {
            const currVal = stocks.price * stocks.qty;
            const isProfit = currVal - stocks.avg * stocks.qty >= 0.0;
            const c = isProfit ? "green" : "red";

            return (
              <tr>
                <td>{stocks.name}</td>
                <td>{stocks.qty}</td>
                <td>{stocks.avg.toFixed(2)}</td>
                <td>{stocks.price.toFixed(2)}</td>
                <td>{currVal}</td>
                <td style={{ color: c }}>
                  {(currVal - stocks.avg * stocks.qty).toFixed(2)}
                </td>

                <td>{stocks.net}</td>
                <td>{stocks.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

<VerticalGraph data={data}/>

    </>
  );
}

export default Holdings;
