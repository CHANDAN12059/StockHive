import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import HomePage from "./landing_page/home/HomePage";
import SignUp from "./landing_page/signup/SignUp";
import AboutPage from "./landing_page/about/AboutPage";
import ProductsPage from "./landing_page/products/ProductsPage";
import ErrorPage from "./landing_page/ErrorPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import Login from "./landing_page/login/Login";

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={< Login/>}></Route>
          <Route path="/SignUp" element={< SignUp/>}></Route>
          <Route path="/About" element={<AboutPage />}></Route>
          <Route path="/Products" element={<ProductsPage />}></Route>
          <Route path="/Pricing" element={<PricingPage/>}></Route>
    
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>

      
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
