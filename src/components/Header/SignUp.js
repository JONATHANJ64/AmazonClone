import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './SignUp.css';
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function Signup() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();


// handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let email = input.email.toLowerCase().trim();
    let password = input.password;

    // creating a new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        navigate("/");
        console.log(userCredential.user);
        // ...
      })
      
      .catch((err) => {
        if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
        setError("The password is too weak.");
      } else if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
        setError("The email address is already in use.");
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
  return (
    <div className='signup'> {/* Use 'signup' as the container class */}
      <Link to="/">
        <img
          className="signup__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="signup__container">
      <h1>Sign Up</h1>
        <p>Fill the form below to create your account.</p>
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
          />
          <label htmlFor="password" className="label-name">
            <span className="content-name">Password</span>
          </label>
        </div>
        <div className="btn">
          {error ? <p className="signup-error">{error}</p> : null}
          <button title="Sign up" className="signup__signUpButton" aria-label="Signup" type="submit">
            Create account
          </button>
        </div>
        </form>

      <div className="option">
        <p>
          Already have an account?
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Signup;