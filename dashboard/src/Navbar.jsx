
import { Link } from "react-router-dom";
import axios from "axios";


function Navbar({isLoggedIn}) {


function handleLogout() {
  axios.post("http://localhost:8080/logout", {}, { withCredentials: true })
    .then((res) => {
      if (res.data.success) {
        window.location.href = "http://localhost:5173"; 
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Error logging out");
    });
}



  return (


    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse d-flex justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item" style={{ marginRight: "5rem" }}>
                <Link
                  className="nav-link"
                  to="#"
                  style={{ display: "flex", alignItems: "center", gap: "2rem" }}
                >
                  NIFTY 50 <span style={{color:"red"}}>100.2</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  to="#"
                  style={{ display: "flex", alignItems: "center", gap: "2rem" }}
                >
                  SENSEX <span style={{color:"red"}}>100.2</span>
                </Link>
              </li>
            </ul>


            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/DashBoard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Orders">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Holdings">
                  Holdings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Positions">
                  Positions
                </Link>
              </li>

              {isLoggedIn && (
              <>
             
                <li className="nav-item">
                <Link className="nav-link" onClick={handleLogout} style={{color:"black"}}>
               <b>Logout</b>
                </Link>
                </li>
           
              </>
                
            )}

         
          
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
