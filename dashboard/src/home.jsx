import { Outlet } from "react-router-dom";
import Watchlist from "./Watchlist";
import { GeneralContextProvider } from "./GeneralContext";

function Home() {
  return (
    <div className="row">
      <div className="col-4 border-end">
        <GeneralContextProvider>
        <Watchlist />
        </GeneralContextProvider>
       
      </div>
      <div className="col-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
