import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa"; // Untuk Google Icon
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-peach flex h-screen items-center justify-center">
      <div className="flex max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Form Section */}
        <div className="flex w-96 flex-col justify-center p-10">
          <h1 className="mb-8 text-4xl font-bold">Welcome Back</h1>
          <div className="mb-4">
            <input
              type="text"
              placeholder="User Name"
              className="w-full rounded-lg border border-gray-300 bg-yellow-100 p-3 text-gray-800 focus:border-yellow-500 focus:outline-none"
            />
          </div>
          <div className="relative mb-4">
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
          <button className="mb-4 w-full rounded-lg bg-gradient-to-r from-yellow-400 to-pink-400 py-3 font-semibold text-white hover:opacity-90">
            Login
          </button>
          <div className="my-4 text-center text-gray-500">Or</div>
          <button className="flex w-full items-center justify-center rounded-lg border border-gray-300 py-3 text-gray-800 hover:bg-gray-100">
            <FaGoogle className="mr-2" /> Login with Google
          </button>
        </div>

        {/* Image Section */}
        <div className="hidden w-96 md:block">
          <img
            src="https://images.unsplash.com/photo-1728388939226-3fc095526a91?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login Image"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
