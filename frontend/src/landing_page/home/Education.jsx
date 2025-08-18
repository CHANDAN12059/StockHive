function Education() {
  return (
    <div className="container">
      <div className="row mb-5" style={{display:"flex",alignItems:"center"}}>
        <div className="col">
          <img src="media/images/education.svg"></img>
        </div>

        <div className="col">
          <h3 style={{color:"#424242"}}>Free and open market education</h3>
          <br></br>
          <p className="text-muted">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <br></br>
          <p className="text-muted">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Education;
