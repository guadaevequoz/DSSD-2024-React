import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { depositoService } from "../services/depositoService";
import { useNavigate } from "react-router-dom";

const Solicitudes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [recorrido, setRecorrido] = useState("");
  const [nroOrden, setNroOrden] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (authService.getUser()) setUser(authService.getUser());
    else navigate("/login");
  }, []);

  const handleStart = () => {
    navigate(`/form/${recorrido["caseId"]}`);
  };

  const handleCancel = (index) => {
    setNroOrden(null);
    setRecorrido(null);
    setMensaje("");
  };

  const buscarRecorrido = async () => {
    // simular búsqueda de recolector
    if (nroOrden) {
      const res = await depositoService.getRouteByCaseId(nroOrden);
      if (res.length > 0 && res[0]["state"] === "ready") {
        setRecorrido(res[0]);
      } else {
        setRecorrido(null);
        setMensaje(
          "No se encontró una entrega pendiente con ese número de orden"
        );
      }
      setNroOrden("");
    } else {
      handleCancel();
    }
  };

  const handleInputChange = (e) => {
    const value = +e.target.value;
    setNroOrden((curr) => (isNaN(value) ? curr : value));
  };

  return (
    <>
      <Navbar user={user} />
      <div className="md:p-10 p-4">
        <h1 className="md:text-4xl text-xl font-bold mb-4">Recibir entrega</h1>
        <hr className="mb-4" />
        <div className="border-b mb-4">
          <h2 className="font-semibold">Buscar entrega</h2>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={nroOrden}
              onChange={handleInputChange}
              placeholder="Número de orden..."
              className="border px-4 py-2 flex-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={buscarRecorrido}
              className="bg-teal-700 ml-1 text-white px-4 py-2 rounded-lg mr-2 hover:bg-teal-600"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      {recorrido ? (
        <div className="flex w-full">
          <div className="flex flex-col mx-auto">
            <p>
              Se encontró un recorrido pendiente con el número #
              {recorrido["caseId"]}, cargado el{" "}
              {new Date(recorrido["reached_state_date"]).toLocaleDateString(
                "es"
              )}
              .
            </p>
            <div className="mx-auto my-4">
              <button
                className="bg-teal-700 text-white px-4 py-2 rounded-lg mr-2 hover:bg-teal-600"
                onClick={handleStart}
              >
                Comenzar
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : mensaje ? (
        <div className="p-4 rounded bg-red-100 text-red-600 text-center">
          {mensaje}
        </div>
      ) : (
        <div className="p-4 rounded bg-gray-100 text-center w-full text-black/80">
          Ingrese un número de orden en el buscador de arriba para iniciar la
          búsqueda.
        </div>
      )}
    </>
  );
};

export default Solicitudes;
