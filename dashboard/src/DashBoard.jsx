import { holdings } from "./data/data";

function DashBoard({username}) {
  return (
    <>
      <div className="row">
        <h2
          className="mt-3 mb-3"
          style={{ textAlign: "center", color: "#424242" }}
        >
        <h3 style={{  fontWeight: "600"}}>Hi {username} ! </h3>
        </h2>
      </div>

      <hr></hr>

      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5rem",
        }}
      >
        <div className="col-4">
          <h6>Equity</h6>

          <h1>3.74K</h1>
          <p>margin available</p>
        </div>

        <div className="col-4">
          <p>Margin used: 0</p>
          <p>Opening balance: 3.74</p>
        </div>
      </div>
      <hr></hr>

      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5rem",
        }}
      >
        <div className="col-4">
          <h6>Holdings ({holdings.length})</h6>

          <h1>1.55K</h1>
          <p>P&L</p>
        </div>

        <div className="col-4">
          <p>Current Value: 31.43k</p>
          <p>Investment: 29.88k</p>
        </div>
      </div>
      <hr></hr>
    </>
  );
}

export default DashBoard;
