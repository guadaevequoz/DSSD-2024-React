import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (authService.getUser()) setUser(authService.getUser());
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="p-10">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Ecocycle🍃</h1>
        <p className="text-lg">
          Sé parte del proceso de economía circular.{" "}
          {!user && "Si queres cargar tus materiales, inicia sesión."}
        </p>
      </div>
    </>
  );
};

export default Home;
