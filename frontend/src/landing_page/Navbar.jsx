import { Link } from "react-router-dom";

function Navbar() {
    return ( 



<nav className="navbar navbar-expand-lg  border-bottom" style={{backgroundColor:"#FFF"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img src="/media/images/logo.png" style={{width:"6%"}} alt="logo"></img></Link>
    
   
    <div className="collapse navbar-collapse"  id="navbarNav">
      <ul className="navbar-nav ms-auto me-5">
      
        <li className="nav-item">
          <Link className="nav-link" to="/About">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/pricing">Pricing</Link>
        </li>
       
        <li className="nav-item">
          <Link className="nav-link " aria-current="page" to="/signup" style={{
    color: "#28a745",
    fontWeight: "500",}}><b>Signup / Login</b></Link>
        </li>
      </ul>
    </div>
  </div>
</nav>









     );
}

export default Navbar;