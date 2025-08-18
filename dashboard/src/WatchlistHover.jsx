import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";
import { Tooltip, Grow } from "@mui/material";
import GeneralContext from "./GeneralContext";
import { useContext } from "react";

function WatchlistHover({ id }) { 


const generalContext=useContext(GeneralContext);


function handleBuy(){
  generalContext.openBuyWindow(id);
}

function handleSell(){
  generalContext.openSellWindow(id);
}




  return (

    <div>
    
    <Tooltip title={`Buy ${id}`} placement="top" arrow TransitionComponent={Grow} >
      <button className="btn btn-sm btn-primary me-3" onClick={handleBuy}>Buy</button>
    </Tooltip>
    <Tooltip title={`Sell ${id}`} placement="top" arrow TransitionComponent={Grow}>
      <button className="btn btn-sm btn-danger" onClick={handleSell}>Sell</button>
    </Tooltip>
  
    
    </div>
   
    
  );
}

export default WatchlistHover;
