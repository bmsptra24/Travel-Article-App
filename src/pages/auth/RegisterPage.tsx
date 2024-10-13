import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { RegisterResponse } from "../../types/auth";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    const requestOptions: RequestInit = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/auth/local/register",
        requestOptions,
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result: RegisterResponse = await response.json();
      console.log("Registration Success:", result);

      // Store JWT or user data if needed
      localStorage.setItem("jwt", result.jwt);
      // Redirect to login or home page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-accent font-raleway">
      <div className="flex flex-row-reverse rounded-3xl bg-white p-0 shadow-xl md:p-4">
        {/* Form Section */}
        <div className="flex w-[24rem] flex-col justify-center gap-8 p-10">
          <h1 className="text-4xl font-bold">Register Now</h1>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-yellow-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-yellow-500 focus:outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 focus:border-yellow-500 focus:outline-none"
              />
              <div
                className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                onClick={handleTogglePassword}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleRegister}
              className="flex w-full justify-center rounded-lg bg-gradient-to-r from-secondary to-primary py-3 font-semibold text-white hover:opacity-90"
            >
              Register
            </button>
          </div>

          <p className="text-slate-600">
            Have an account?{" "}
            <Link to={"/login"} className="font-bold">
              Login
            </Link>{" "}
            now
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden w-[24rem] md:block">
          <img
            src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Register Image"
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
