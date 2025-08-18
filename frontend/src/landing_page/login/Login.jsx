import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  useEffect(() => {
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios.post("https://stockhive-backend-do5f.onrender.com/login", { username, password }, { withCredentials: true })
    .then(()=>{
        window.location.href = "https://stock-hive-dashboard.vercel.app/dashboard"
    })
    .catch(()=>{
        alert("Invalid credentials");
    })
    setUserName("");
    setPassword("");

  }

  return (

    <div class="card border-0" style={{backgroundColor: "#e6f4ea"}}>
    <form
      className="needs-validation  mb-5 mt-5"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="offset-3 mb-5 mt-5">
        <div className="row mb-5"></div>

        <div class="mb-3 row">
          <label for="inputName" class="col-sm-1 col-form-label">
            Name
          </label>
          <div class="col-sm-5">
            <input
              type="text"
              class="form-control"
              id="inputName"
              value={username}
              onChange={handleUserName}
              required
            />
          </div>
        </div>

        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-1 col-form-label">
            Password
          </label>
          <div class="col-sm-5">
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
        </div>

        <button type="submit" class="btn btn-outline-success">
          Login
        </button>

     
      </div>
    </form>
    </div>
  );
}
export default Login;
