function Pricing() {
  return (
    <div className="container mb-5">
      <div className="row mt-5 mb-5">
        <div className="col  p-5">
          <h4>Unbeatable pricing</h4>
          <br></br>
          <p className="text-muted">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
        </div>
     

      <div
        className="col mt-5"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="text-center text-muted">
          <img src="media/images/pricingMF.svg" style={{ width: "30%" }}></img>
          <p>Free acount opening</p>
        </div>
        <div className="text-center text-muted">
          <img src="media/images/pricingMF.svg" style={{ width: "30%" }}></img>
          <p>Free equity delivery and direct mutual funds</p>
        </div>
        <div className="text-center text-muted">
          <img src="media/images/20.svg" style={{ width: "30%" }}></img>
          <p>Intraday and F&O</p>
        </div>
        
      </div>
      </div>
    </div>
  );
}

export default Pricing;
