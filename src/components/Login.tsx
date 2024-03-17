import React, { useState } from "react";
import FormComponent from "./FormComponent";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../slices/store";
import { loginUser } from "../slices/UserSlice";
import { Circles } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("Password is required");
  const [emailError, setEmailError] = useState("Email is required");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const {message}  = useSelector((state: RootState) => state.message);
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
  const handleLogin = (e: any) => {
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
    setLoading(true);
    dispatch(loginUser(userCredentials))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="border w-5/12 mt-20 mx-auto p-10 bg-slate-100">
      <h3 className="text-center text-4xl font-bold text-blue-900 mb-10">
        Login
      </h3>

      <form onSubmit={handleLogin}>
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
          className={
            !isDisabled
              ? "flex bg-blue-900 text-slate-100 py-2 pl-4 pr-6 rounded-md border-none font-semibold mx-auto"
              : "flex text-slate-600 py-2 pl-4 pr-6 rounded-md border-none font-semibold mx-auto bg-slate-300"
          }
          disabled={isDisabled}
        >
          {loading && (
            <Circles height="20" width="20" color="white" ariaLabel="loading" />
          )}
          <span className="ml-2">Login</span>
        </button>
      </form>
      {message && (
        <div>
          <div className="text-red-600 text-center">{message}</div>
        </div>
      )}
    </div>
  );
};

export default Login;
