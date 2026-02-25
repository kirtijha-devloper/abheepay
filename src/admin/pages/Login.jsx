import React, { useState } from "react";
import { Lock, User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login"); // "login" | "signup"
  const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get the selected role from the form
    const formData = new FormData(e.target);
    const selectedRole = formData.get('role') || 'RETAILER';

    // Store the selected role for the unified dashboard
    localStorage.setItem('userRole', selectedRole);

    // Navigate to the unified admin dashboard
    navigate('/admin');
  };

  return (
    <div className="min-h-[100vh] bg-[#ddf8f7] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden min-h-[420px]">
        {/* LEFT */}
        <div className="relative w-full md:w-[40%] bg-black overflow-hidden flex flex-col justify-center items-center">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-[-10%] left-[-20%] w-[150%] h-[150%] bg-[#00D2CC] rotate-[35deg] origin-bottom-left"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[#00D2CC] skew-x-[-20deg] translate-x-[-20%] opacity-50"></div>
          </div>

          <div className="relative z-10 flex flex-col items-end w-full pr-0">
            <div className="relative bg-white text-black font-bold py-3 px-10 rounded-l-full self-end mr-[-2px] shadow-lg">
              {activeTab === "login" ? "LOGIN" : "SIGN IN"}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowForgot(false);
                setActiveTab(activeTab === "login" ? "signup" : "login");
              }}
              className="mt-6 text-white font-semibold pr-10 hover:text-[#00D2CC] transition-colors"
            >
              {activeTab === "login" ? "SIGN IN" : "LOGIN"}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-between">
          <div className="flex flex-col items-center">
            {/* Icon */}
            <div className="w-16 h-16 bg-gradient-to-br from-[#00D2CC] to-black rounded-full flex items-center justify-center mb-2">
              {showForgot ? (
                <Lock size={36} className="text-white" />
              ) : activeTab === "login" ? (
                <User size={36} className="text-white" />
              ) : (
                <Mail size={36} className="text-white" />
              )}
            </div>

            <h2 className="text-2xl font-bold mb-4">
              {showForgot
                ? "FORGOT PASSWORD"
                : activeTab === "login"
                  ? "LOGIN"
                  : "SIGN IN"}
            </h2>

            {/* Form */}
            <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
              {showForgot ? (
                <>
                  {/* Phone Number */}
                  <div className="border-b-2 py-1.5 flex gap-4">
                    <User size={18} className="text-gray-800" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full outline-none bg-transparent"
                    />
                  </div>

                  {/* Email */}
                  <div className="border-b-2 py-1.5 flex gap-4">
                    <Mail size={18} className="text-gray-800" />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full outline-none bg-transparent"
                    />
                  </div>

                  <div className="flex justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setShowForgot(false)}
                      className="text-[#00D2CC] text-sm hover:underline"
                    >
                      Back to Login
                    </button>

                    <button type="button" className="bg-gradient-to-r from-[#00D2CC] to-black text-white px-8 py-2 rounded-full">
                      Reset
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Role Selection (Kept for MERN Testing) */}
                  <div className="border-b-2 py-1.5 flex gap-4">
                    <User size={18} className="text-gray-800" />
                    <select
                      name="role"
                      className="w-full outline-none bg-transparent text-gray-700 cursor-pointer"
                      defaultValue="ADMIN"
                    >
                      <option value="ADMIN">Login As: ADMIN</option>
                      <option value="SUPER_DISTRIBUTOR">Login As: SUPER DISTRIBUTOR</option>
                      <option value="MASTER_DISTRIBUTOR">Login As: MASTER DISTRIBUTOR</option>
                      <option value="DISTRIBUTOR">Login As: DISTRIBUTOR</option>
                      <option value="RETAILER">Login As: RETAILER</option>
                    </select>
                  </div>

                  {activeTab === "signup" && (
                    <div className="border-b-2 py-1.5 flex gap-4">
                      <User size={18} className="text-gray-800" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full outline-none bg-transparent"
                      />
                    </div>
                  )}

                  {/* Phone Number / Email */}
                  <div className="border-b-2 border-gray-200 py-2 flex gap-4 items-center focus-within:border-[#00D2CC] transition-colors">
                    <User size={20} className="text-gray-500" />
                    <input
                      type="text"
                      name="credential"
                      required
                      placeholder={activeTab === "login" ? "Email or Phone Number" : "Phone Number"}
                      className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  {/* Email */}
                  <div className="border-b-2 py-1.5 flex gap-4">
                    <Mail size={18} className="text-gray-800" />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full outline-none bg-transparent"
                    />
                  </div>

                  {/* Password */}
                  <div className="border-b-2 py-1.5 flex gap-4">
                    <Lock size={18} className="text-gray-800" />
                    <input
                      type="password"
                      required
                      placeholder="Password"
                      className="w-full outline-none bg-transparent"
                    />
                  </div>

                  {activeTab === "signup" && (
                    <div className="border-b-2 py-1.5 flex gap-4">
                      <Lock size={18} className="text-gray-800" />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full outline-none bg-transparent"
                      />
                    </div>
                  )}

                  <div className="flex justify-between pt-1">
                    {activeTab === "login" ? (
                      <button
                        type="button"
                        onClick={() => setShowForgot(true)}
                        className="text-[#00D2CC] text-sm hover:underline"
                      >
                        Forgot Password?
                      </button>
                    ) : (
                      <span />
                    )}

                    <button type="submit" className="bg-gradient-to-r from-[#00D2CC] to-black text-white px-8 py-2 rounded-full transform hover:-translate-y-0.5 transition-all">
                      {activeTab === "login" ? "Login" : "Sign In"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Footer Text */}
          <div className="mt-4 pt-3 border-t text-center text-sm text-gray-500">
            {showForgot
              ? "We will send a reset link to your email"
              : activeTab === "login"
                ? "Or Login With"
                : "Or Continue With"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
