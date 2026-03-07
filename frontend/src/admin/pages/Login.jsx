import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { apiRequest } from '../../services/api';
import storage from '../../utils/storage';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login"); // "login" | "signup"
  const [showForgot, setShowForgot] = useState(false);
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [tempUserId, setTempUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const credential = formData.get('credential');
    const password = formData.get('password');
    const name = formData.get('name');
    const email = formData.get('email'); // Still needed for signup
    const role = formData.get('role');

    try {
      if (activeTab === 'login') {
        const response = await apiRequest('/auth/login', 'POST', { credential, password });

        if (response.requireOtp) {
          setTempUserId(response.userId);
          setShowOtpStep(true);
          return; // Don't redirect yet
        }

        // Fallback for direct token assignment (if ever needed)
        storage.set('authToken', response.token);
        storage.set('userRole', response.user.role);
        storage.set('userData', JSON.stringify(response.user));

        navigate('/admin');
      } else {
        // Sign Up (Initial Registration)
        const response = await apiRequest('/auth/register', 'POST', {
          name,
          email,
          mobile: formData.get('mobile'),
          password,
          role: role || 'RETAILER'
        });

        alert('Registration successful! Please login.');
        setActiveTab('login');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const otp = formData.get('otp');

    try {
      const response = await apiRequest('/auth/verify-login-otp', 'POST', { userId: tempUserId, otp });

      storage.set('authToken', response.token);
      storage.set('userRole', response.user.role);
      storage.set('userData', JSON.stringify(response.user));

      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
              {showOtpStep ? "VERIFY OTP" : activeTab === "login" ? "LOGIN" : "SIGN IN"}
            </div>

            {!showOtpStep && (
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
            )}
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
              {showOtpStep
                ? "ENTER OTP"
                : showForgot
                  ? "FORGOT PASSWORD"
                  : activeTab === "login"
                    ? "LOGIN"
                    : "SIGN IN"}
            </h2>

            {/* Form */}
            {showOtpStep ? (
              <form className="w-full max-w-sm space-y-4" onSubmit={handleVerifyOtp}>
                <div className="border-b-2 py-1.5 flex gap-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">We have sent a 6-digit OTP to your registered email & mobile number.</p>
                </div>

                <div className="border-b-2 py-1.5 flex gap-4 tracking-widest">
                  <Lock size={18} className="text-gray-800 self-center" />
                  <input
                    type="text"
                    name="otp"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    className="w-full outline-none bg-transparent text-center text-lg tracking-widest font-semibold"
                  />
                </div>

                <div className="flex flex-col gap-2 pt-1 w-full">
                  {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                  <div className="flex justify-between items-center w-full mt-4">
                    <button
                      type="button"
                      onClick={() => setShowOtpStep(false)}
                      className="text-[#00D2CC] text-sm hover:underline"
                    >
                      Back to Login
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`bg-gradient-to-r from-[#00D2CC] to-black text-white px-8 py-2 rounded-full transform hover:-translate-y-0.5 transition-all outline-none ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? 'Verifying...' : "Verify & Login"}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
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
                          name="name"
                          placeholder="Full Name"
                          className="w-full outline-none bg-transparent"
                        />
                      </div>
                    )}

                    {/* Unified Credential Field */}
                    <div className="border-b-2 border-gray-200 py-2 flex gap-4 items-center focus-within:border-[#00D2CC] transition-colors">
                      <User size={20} className="text-gray-500" />
                      <input
                        type="text"
                        name={activeTab === "login" ? "credential" : "mobile"}
                        required
                        placeholder={activeTab === "login" ? "Email or Phone Number" : "Phone Number"}
                        className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* Email (Signup only) */}
                    {activeTab === "signup" && (
                      <div className="border-b-2 py-1.5 flex gap-4">
                        <Mail size={18} className="text-gray-800" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="w-full outline-none bg-transparent"
                        />
                      </div>
                    )}

                    {/* Password */}
                    <div className="border-b-2 py-1.5 flex gap-4">
                      <Lock size={18} className="text-gray-800" />
                      <input
                        type="password"
                        name="password"
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
                          name="confirmPassword"
                          required={activeTab === "signup"}
                          placeholder="Confirm Password"
                          className="w-full outline-none bg-transparent"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-2 pt-1 w-full">
                      {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                      <div className="flex justify-between items-center w-full">
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

                        <button
                          type="submit"
                          disabled={loading}
                          className={`bg-gradient-to-r from-[#00D2CC] to-black text-white px-8 py-2 rounded-full transform hover:-translate-y-0.5 transition-all outline-none ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {loading ? 'Processing...' : activeTab === "login" ? "Login" : "Sign In"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>

          {/* Footer Text */}
          <div className="mt-4 pt-3 border-t text-center text-sm text-gray-500">
            {showOtpStep
              ? "Ensure your contact details are accessible"
              : showForgot
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
