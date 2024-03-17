import React, { useState } from "react";
import FormComponent from "./FormComponent";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../slices/store";
import { clearMessage } from "../slices/messageSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("Password is required");
  const [emailError, setEmailError] = useState("Email is required");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: any) => state.user);
  const { message } = useSelector((state: any) => state.message);
  const navigate = useNavigate();
  const isDisabled = passwordError !== "" || emailError !== "";

  const handlePasswordChange = (event: any) => {
    const password = event.target.value;
    if (password.length === 0) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password should be atleast 8 characters");
    }
    if (password.length >= 8) {
      setPasswordError("");
    }
    setPassword(password);
  };

  const handleEmailChange = (event: any) => {
    const email = event.target.value;
    if (email.length === 0) {
      setEmailError("Email is required");
    }
    if (email.length > 0) {
      setEmailError("");
    }
    setEmail(email);
  };
  
  const handleRegister = (e: any) => {
    e.preventDefault();
    let userCredentials: any = { email, password };
    const isMatch = email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!isMatch) {
      setEmailError("Invalid email entered");
      return;
    }
    dispatch(registerUser(userCredentials))
      .then((data: any) => {
        console.log("register data", data);
        if (
          data.error.message === "Rejected" ||
          data.type === "user/registerUser/rejected"
        ) {
          setIsSuccessful(false);
        } else {
          setIsSuccessful(true);
          navigate("/dashboard");
        }
      })
      .catch(() => {
        setIsSuccessful(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="border w-5/12 mt-20 mx-auto p-10 bg-slate-100">
      <h3 className="text-center text-4xl font-bold text-blue-900 mb-10">
        Register
      </h3>

      <form onSubmit={handleRegister}>
        <FormComponent
          email={email}
          password={password}
          onChangePassword={handlePasswordChange}
          onChangeEmail={handleEmailChange}
          passwordError={passwordError}
          emailError={emailError}
        />
        <button
          type="submit"
          className={!isDisabled ? "block bg-blue-900 text-slate-100 py-2 px-6 rounded-md border-none font-semibold mx-auto": "block bg-slate-300 text-slate-600 py-2 px-6 rounded-md border-none font-semibold mx-auto"}
          disabled={isDisabled}
        >
          Register
        </button>
      </form>
      <p className="mt-10 text-sm text-center">
        Already registered? Please login
      </p>
      <Link
        to={"/login"}
        className="text-blue-900 text-center block font-medium"
        onClick={(e) => dispatch(clearMessage())}
      >
        Login
      </Link>

      {message && (
        <div>
          <div
            className={
              isSuccessful
                ? "text-green-600 text-center"
                : "text-red-600 text-center"
            }
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
