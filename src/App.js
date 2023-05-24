import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Header/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from "./components/Orders/Checkout";
import Login from "./components/Header/Login";
import Orders from "./components/Orders/Orders_";
import Payment from "./components/Orders/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { useStateValue } from "./StateProvider";
import { Elements } from "@stripe/react-stripe-js";
import SignUp from "./components/Header/SignUp";
import { auth } from "./firebase";

const promise = loadStripe(
  "pk_test_51NAeQ7BV9ttPtoqFLHv64rwizRqu6WocUfRQYvKD5b150LQVKALNUBjy4wnXMFVw3rhEmZizDpXlIuotbpulWkTW00aAt5OUXJ"
);


function App() {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);

  return (
    //BEM
    <Router>
      <div className="app">
      <Routes>
      <Route path="/orders" element={<>
           <Header />
            <Orders />
          </>} />
          <Route path="/login" element={<>
            <Login />
          </>} />
          <Route path="/SignUp" element={<>
            <SignUp />
          </>} />
          <Route path="/checkout" element={<>
            <Header />
            <Checkout />
          </>} />
            <Route path="/payment" element={<>
            <Header />
            <Elements stripe={promise}>
            <Payment />
            </Elements>
          </>} />
          <Route path="/" element={<>
            <Header />
            <Home />
          </>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
