import React, { useState } from "react";
import store from "../states/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function handleLogin() {
    const userData = {
      name: name,
      email: email,
    };
    store.dispatch({ type: "SET_USER", payload: userData });
    navigate("/home");
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center bg-gray-200 py-8 px-28 rounded-md">
        <h1 className="text-2xl mb-4 font-bold">Login</h1>
        <input
          type="text"
          placeholder="Name"
          className="p-2 my-2 rounded-md"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Email"
          className="p-2 my-2 rounded-md"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button
          className="p-2 m-2 rounded-md bg-blue-600 w-full text-white"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
