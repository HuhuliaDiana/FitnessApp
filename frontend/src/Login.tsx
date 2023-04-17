import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "./util/useLocalStorage";


const Login = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function sendLoginRequest() {
    const reqBody = {
      email: email,
      password: password,
    };
    fetch("/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Invalid login attempt.");
      })
      .then((data) => {
        const jwt = data.accessToken;
        setJwt(jwt);
        navigate("/");
      })
      .catch((message) => {
        console.log(message);
      });
  }

  return (
    <form>
      <label>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div>
        <button type="submit" onClick={() => sendLoginRequest()}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
