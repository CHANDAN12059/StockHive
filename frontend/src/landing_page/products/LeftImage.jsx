function LeftImage({ source, title, info }) {
  return (
    <div className="container">
      <div className="row" style={{ display: "flex", alignItems: "center" }}>
        <div className="col-1"></div>
        <div className="col me-5">
          <img src={source}></img>
        </div>

        <div className="col">
          <h4 style={{ color: "#424242" }}>{title}</h4>
          <p style={{ color: "#424242", lineHeight: 2 }}>{info}</p>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

export default LeftImage;
