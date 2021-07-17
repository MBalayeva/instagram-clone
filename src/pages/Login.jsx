import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

const Login = () => {
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md h-screen items-center">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="Iphone with an ig app"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col mb-4 bg-white rounded p-4 border border-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src="images/logo.png"
              alt="Ig logo"
              className="mt-2 mb-4 w-6/12"
            />
          </h1>

          {error && <p className="text-xs text-red-primary mb-4">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              type="text"
              value={emailAddress}
              aria-label="Enter your email address"
              placeholder="Enter your email address"
              className="text-gray-base text-sm py-5 px-4 h-2 mr-3 w-full border border-gray-primary rounded mb-2"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <input
              type="password"
              value={password}
              aria-label="Enter your password"
              placeholder="Enter your password"
              className="text-gray-base text-sm py-5 px-4 h-2 mr-3 w-full border border-gray-primary rounded mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={isInvalid}
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Do not have an account?{" "}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
