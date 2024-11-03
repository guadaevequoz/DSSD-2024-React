import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { depositoService } from "../services/depositoService";
import { useNavigate } from "react-router-dom";

const Deposito = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [deposito, setDeposito] = useState();

  useEffect(() => {
    if (authService.getUser()) {
      setUser(authService.getUser());
    } else navigate("/login");
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="md:p-10 p-4">
        <h1 className="md:text-4xl text-xl font-bold mb-4">Mi deposito</h1>
        <hr className="mb-4" />
      </div>
    </>
  );
};

export default Deposito;
