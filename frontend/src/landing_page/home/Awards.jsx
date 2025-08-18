function AWARDS() {
  return (
    <div className="container mb-5">
      <div className="row">
        <img
          src="public/media/images/largestBroker.svg"
          className="col-6 me-5"
          style={{ width: "40%" }}
        ></img>
        <div className="col-6 ms-5">
          <h1>India’s Trusted Platform for Modern Traders</h1>
          <p>
            With over 2 million active investors, StockHive powers more than 15%
            of India’s daily retail trading volume, empowering users to trade
            and invest seamlessly across:
          </p>
          <br></br>

          <div className="row">
            <div className="col">
              <ul>
                <li>Futures and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivates</li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <li>Stocks and Ipos</li>
                <li>Direct mutual funds</li>
                <li>Bonds and Govt. Securities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AWARDS;
