function Footer() {
    const linkStyle = { color: "#666666", textDecoration: "none" };
  
    return (
      <div className="container mt-5 mb-5">
        <div className="row mb-5 mt-5">

          <div className="col me-5">
            <img src="/media/images/logo.png" style={{ width: "40%" }} className="mb-3" alt="logo" />
            <p style={linkStyle}>2010 - 2025, StockHive Broking Ltd</p>
            <p style={linkStyle} > All rights reserved</p>
          </div>
  
      
          <div className="col">
            <h4 style={{ color: "#424242" }}>Account</h4>
            <p><a href="#" style={linkStyle}>Open demat account</a></p>
            <p><a href="#" style={linkStyle}>Minor demat account</a></p>
            <p><a href="#" style={linkStyle}>NRI demat account</a></p>
            <p><a href="#" style={linkStyle}>Commodity</a></p>
            <p><a href="#" style={linkStyle}>Dematerialisation</a></p>
            <p><a href="#" style={linkStyle}>Fund transfer</a></p>
            <p><a href="#" style={linkStyle}>MTF</a></p>
            <p><a href="#" style={linkStyle}>Referral program</a></p>
          </div>
  
        
          <div className="col">
            <h4 style={{ color: "#424242" }}>Support</h4>
            <p><a href="#" style={linkStyle}>Contact us</a></p>
            <p><a href="#" style={linkStyle}>Support portal</a></p>
            <p><a href="#" style={linkStyle}>How to file a complaint?</a></p>
            <p><a href="#" style={linkStyle}>Status of your complaints</a></p>
            <p><a href="#" style={linkStyle}>Bulletin</a></p>
            <p><a href="#" style={linkStyle}>Circular</a></p>
            <p><a href="#" style={linkStyle}>Z-Connect blog</a></p>
            <p><a href="#" style={linkStyle}>Downloads</a></p>
          </div>
  
 
          <div className="col">
            <h4 style={{ color: "#424242" }}>Company</h4>
            <p><a href="#" style={linkStyle}>About</a></p>
            <p><a href="#" style={linkStyle}>Philosophy</a></p>
            <p><a href="#" style={linkStyle}>Press & media</a></p>
            <p><a href="#" style={linkStyle}>Careers</a></p>
            <p><a href="#" style={linkStyle}>StockHive Cares (CSR)</a></p>
            <p><a href="#" style={linkStyle}>StockHive tech.</a></p>
            <p><a href="#" style={linkStyle}>Open source</a></p>
          </div>
  
     
          <div className="col">
            <h4 style={{ color: "#424242" }}>Quick links</h4>
            <p><a href="#" style={linkStyle}>Upcoming IPOs</a></p>
            <p><a href="#" style={linkStyle}>Brokerage charges</a></p>
            <p><a href="#" style={linkStyle}>Market holidays</a></p>
            <p><a href="#" style={linkStyle}>Economic calendar</a></p>
            <p><a href="#" style={linkStyle}>Calculators</a></p>
            <p><a href="#" style={linkStyle}>Markets</a></p>
            <p><a href="#" style={linkStyle}>Sectors</a></p>
          </div>
        </div>



      </div>

   


    );
  }
  
  export default Footer;
  