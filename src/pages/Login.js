import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [DNI, setDNI] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = authService.login(DNI, password);
    if (success) {
      navigate("/");
    } else {
      alert("DNI o contraseña incorrectos");
    }
  };

  const handleDNIChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setDNI(value);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-800">
      <div className="md:w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Inicia sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="DNI" className="block text-gray-700 font-bold mb-2">
              DNI
            </label>
            <input
              type="text"
              id="DNI"
              value={DNI}
              onChange={handleDNIChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={8}
              pattern="\d{1,8}" // Solo permite entre 1 y 8 dígitos
              title="Solo se permiten números de hasta 8 dígitos"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              minLength={8}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
