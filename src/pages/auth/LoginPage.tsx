import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../libs/auth";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const result = await login(username, password);
      console.log("Login Success:", result);

      // Save user and jwt to localStorage, except password
      const { jwt, user } = result;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to home or another page on successful login
      navigate("/article");
    } catch (err) {
      console.error("Login Failed:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-accent font-raleway">
      <div className="flex rounded-3xl bg-white p-0 shadow-xl md:p-4">
        {/* Form Section */}
        <div className="flex w-[24rem] flex-col justify-center gap-8 p-10">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="User Name"
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
              onClick={handleLogin}
              className="flex w-full justify-center rounded-lg bg-gradient-to-r from-secondary to-primary py-3 font-semibold text-white hover:opacity-90"
            >
              Login
            </button>
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
