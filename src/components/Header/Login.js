import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // initialized auth instance

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let email = input.email.toLowerCase().trim();
    let password = input.password;

    // sign in user
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      navigate("/");
      console.log(userCredential.user);
      // ...
    })

    .catch((err) => {
      if (
        err.code === AuthErrorCodes.INVALID_PASSWORD ||
        err.code === AuthErrorCodes.USER_DELETED
      ) {
        setError("The email address or password is incorrect");
      } else {
        console.log(err.code);
        alert(err.code);
      }
    });
};

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDemoClick = () => {
    setInput({ email: "demo@example.com", password: "password" });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign-in</h1>

        <form autoComplete="off" className="form" onSubmit={handleSubmit}>
          <div className="email-input">
            <input
              name="email"
              placeholder=""
              type="text"
              onChange={handleChange}
              value={input.email}
              required
              autoComplete="true"
              style={{ height: "50px" }}
            />
            <label htmlFor="email" className="label-name">
              <span className="content-name">Email</span>
            </label>
          </div>
          <div className="password-input">
            <input
              name="password"
              placeholder=""
              onChange={handleChange}
              value={input.password}
              type="password"
              required
              autoComplete="true"
              style={{ height: "50px" }}
            />
            <label htmlFor="password" className="label-name">
              <span className="content-name">Password</span>
            </label>
          </div>
          <div className="btn">
            {error && <p className="login-error">{error}</p>}
            <button               className="login__signInButton"
              title="Login"
              aria-label="Login"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>

        <p>
          By signing-in, you agree to the AMAZON FAKE CLONE Conditions of Use
          & Sale. Please see our Privacy Notice, our Cookies Notice, and our
          Interest-Based Ads Notice.
        </p>

        <div className="option">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>

        <button className="demo-button" onClick={handleDemoClick}>
          Demo
        </button>
      </div>
    </div>
  );
}

export default Login;

