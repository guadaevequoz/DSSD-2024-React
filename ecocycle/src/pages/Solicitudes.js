import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Solicitudes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (authService.getUser()) setUser(authService.getUser());
    else navigate("/login");
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="p-10">
        <h1 className="text-4xl font-bold mb-4">Solicitudes</h1>
        <hr className="mb-4" />
      </div>
    </>
  );
};

export default Solicitudes;
