import React, { useState } from 'react';

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#eef3ff] to-[#e6edfd] px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md px-8 py-10">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Task Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Login with your credentials</p>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />

        {/* Login Button */}
        <button
          onClick={handleLoginClick}
          className="w-full bg-[#5c4efc] hover:bg-[#493de0] text-white text-sm font-semibold py-3 rounded-lg transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
