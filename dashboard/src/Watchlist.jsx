import { Tooltip, Grow } from "@mui/material";
import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import WatchlistHover from "./WatchlistHover";
import { watchlist } from "./data/data";
// import { DoughnutChart } from "./DoughNutChart";
function Watchlist() {
  const [showWatchListActions, setWatchListActions] = useState(null);

  function handleMouseEnter(stockName) {
    setWatchListActions(stockName);
  }

  function handleMouseLeave() { 
    setWatchListActions(null);
  }


 

  return (
    <>
   <div style={{height:"2%"}}></div>

      <ul>
        {watchlist.map((stocks) => {
          return (
            <div
              onMouseEnter={()=>handleMouseEnter(stocks.name)}
              onMouseLeave={handleMouseLeave}
              style={{display:"flex",justifyContent:"space-between" ,padding:"1rem"}}
            >




              <span className={stocks.isDown ? "text-danger" : "text-success"}>
                {stocks.name}
              </span>
              <div className="stocks-info">
                <span>{stocks.percent}</span>
                {stocks.isDown ? <KeyboardArrowDown className="text-danger" /> : <KeyboardArrowUp className="text-success"                          />}
                <span>{stocks.price}</span>
              </div>

              {showWatchListActions === stocks.name && (
                <WatchlistHover id={stocks.name} />
              )}

            </div>

          );
        })}
      </ul>









    </>
  );
}

export default Watchlist;
