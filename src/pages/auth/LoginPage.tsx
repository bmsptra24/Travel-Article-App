import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="font-raleway bg-accent flex h-screen items-center justify-center">
      <div className="flex rounded-3xl bg-white p-0 shadow-xl md:p-4">
        {/* Form Section */}
        <div className="flex w-[24rem] flex-col justify-center gap-8 p-10">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="User Name"
              className="w-full rounded-lg border border-gray-300 bg-yellow-100 p-3 text-gray-800 focus:border-yellow-500 focus:outline-none"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-lg border border-gray-300 bg-yellow-100 p-3 text-gray-800 focus:border-yellow-500 focus:outline-none"
              />
              <div
                className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                onClick={handleTogglePassword}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
            <Link
              to={"/home"}
              className="from-secondary to-primary flex w-full justify-center rounded-lg bg-gradient-to-r py-3 font-semibold text-white hover:opacity-90"
            >
              Login
            </Link>
          </div>

          <p className="text-slate-600">
            Don’t have any account?{" "}
            <Link to={"/register"} className="font-bold">
              Register
            </Link>{" "}
            here
          </p>
        </div>

        {/* Image Section */}
        <div className="hidden w-[24rem] md:block">
          <img
            src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login Image"
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
