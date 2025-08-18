import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./home";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Positions from "./Positions";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import DashBoard from "./DashBoard";

function App() {



  let [isLoggedIn,setIsLoggedIn]=useState(false);
  let [username,setUserName]=useState("");
  
  
  
  
  useEffect(()=>{
  
    axios.get("http://localhost:8080/checkAuth", { withCredentials: true })
    .then((res)=>{
      setIsLoggedIn(res.data.loggedIn);
      if(res.data.loggedIn){
        setUserName(res.data.user.username);
      }
    })
    .catch(err => console.log(err));
  
  },[]);
  


  return (
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Dashboard" element={<DashBoard username={username}/>} />
            <Route path="/Holdings" element={<Holdings />} />
            <Route path="/Positions" element={<Positions />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
