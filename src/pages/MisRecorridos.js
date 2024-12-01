import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { recolectorService } from "../services/recolectorService";

const MisRecorridos = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [recorridos, setRecorridos] = useState([]);

  useEffect(() => {
    if (authService.getUser()) {
      setUser(authService.getUser());
    } else navigate("/login");

    const getRecorridos = async () => {
      let res = await recolectorService.getRequestsByCurrentUser();
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
        <div className="border-b">
          {recorridos.length === 0 ? (
            <div className="p-4 rounded bg-gray-100 text-center w-full text-black/80">
              Ups! Parece que no tenes recorridos.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-4">
              {recorridos.map((orden) => (
                <div
                  key={orden.id}
                  className="bg-white shadow-md p-4 rounded-lg border"
                >
                  <h2 className="text-lg font-bold">Recorrido #{orden.id}</h2>
                  <p className="text-sm mt-2 text-gray-600">
                    Materiales incluidos:{" "}
                    {orden.materials
                      .map(
                        (m, index) =>
                          `${m.material.name} (${m.amount} ${m.material.unit})`
                      )
                      .join(", ")}
                  </p>
                  <p className="mt-2">
                    <span
                      className={`text-sm p-1 rounded-lg ${
                        !orden.received
                          ? "bg-yellow-100 text-yellow-600 border border-yellow-600"
                          : "bg-green-100 text-green-600 border border-green-600"
                      }`}
                    >
                      {orden.received ? "Recibida" : "Pendiente"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MisRecorridos;
