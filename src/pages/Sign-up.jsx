import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { doesUsernameExists } from "../services/firebase";
import * as ROUTES from "../constants/routes";

const Signup = () => {
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid = password === "" || emailAddress === "";

  const handleSignup = async (event) => {
    event.preventDefault();

    const usernameExists = doesUsernameExists(username);

    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName: fullname,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullname("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setError("This username is taken, please choose another one");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
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

          <form onSubmit={handleSignup} method="POST">
            <input
              type="text"
              value={username}
              aria-label="Enter your username"
              placeholder="Enter your username"
              className="text-gray-base text-sm py-5 px-4 h-2 mr-3 w-full border border-gray-primary rounded mb-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              value={fullname}
              aria-label="Enter your fullname"
              placeholder="Enter your fullname"
              className="text-gray-base text-sm py-5 px-4 h-2 mr-3 w-full border border-gray-primary rounded mb-2"
              onChange={(e) => setFullname(e.target.value)}
            />
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
            Have account already?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
