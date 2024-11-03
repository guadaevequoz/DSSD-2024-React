import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { recolectorService } from "../services/recolectorService";

const MisRecorridos = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [recorridos, setRecorridos] = useState();

  useEffect(() => {
    if (authService.getUser()) {
      setUser(authService.getUser());
    } else navigate("/login");

    const getRecorridos = async () => {
      let res = await recolectorService.getRequestsByCurrentUser(
        authService.getUser().id
      );
      if (res) setRecorridos(res);
    };

    getRecorridos();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="md:p-10 p-4">
        <h1 className="md:text-4xl text-xl font-bold mb-4">Mis recorridos</h1>
        <hr className="mb-4" />
      </div>
    </>
  );
};

export default MisRecorridos;
