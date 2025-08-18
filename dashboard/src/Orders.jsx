import axios from "axios";
import { useEffect, useState } from "react";

function Orders() {
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://stockhive-backend-do5f.onrender.com/allOrders").then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <>


      <div style={{ padding: "2rem" }}>
      <h3>ORDERS({orders.length})</h3>
        <table
        className="table table-borderless"
          style={{
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((e) => {
              let color=(e.mode=="BUY")?"green":"red";
              return (
                <tr>
                  <td>{e.name}</td>
                  <td>{e.qty}</td>
                  <td>{e.price}</td>
                  
                  <td style={{color}}>{e.mode}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;
