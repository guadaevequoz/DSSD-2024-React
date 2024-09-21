import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Solicitudes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [dni, setDni] = useState("");
  const [recolector, setRecolector] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (authService.getUser()) setUser(authService.getUser());
    else navigate("/login");
  }, []);

  const handleStart = () => {
    console.log(recolector);
    navigate(`/form/${recolector.recorrido.id}`); // acá deberia ir el id del recorrido
  };

  const handleCancel = (index) => {
    setDni("");
    setRecolector(null);
    setMensaje("");
  };

  const buscarRecolector = () => {
    // simular búsqueda de recolector
    if (dni !== "") {
      if (dni === "12345678") {
        //acá busca al recolector y me trae tmb el recorrido, lo hardcodeo para evitar escribir mucho
        setRecolector({
          nombre: "Walter Bates",
          dni: "12345678",
          email: "walter.bates@unlp.edu.ar",
          pendiente: true, // o false si no hay recorridos pendientes,
          recorrido: JSON.parse(localStorage.getItem("recorrido")),
        });
        setMensaje("");
      } else {
        setRecolector(null);
        setMensaje("No se encontró un recolector con ese DNI");
      }
    } else {
      handleCancel();
    }
  };

  return (
    <>
      <Navbar user={user} />
      <div className="md:p-10 p-4">
        <h1 className="md:text-4xl text-xl font-bold mb-4">Recibir entrega</h1>
        <hr className="mb-4" />
        <div className="border-b mb-4">
          <h2 className="font-semibold">Buscar recolector</h2>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="DNI"
              className="border px-4 py-2 flex-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={buscarRecolector}
              className="bg-teal-700 ml-1 text-white px-4 py-2 rounded-lg mr-2 hover:bg-teal-600"
            >
              Buscar
            </button>
          </div>
        </div>

        {recolector ? (
          <div>
            <div className="mb-4">
              <label className="block font-semibold">Nombre completo</label>
              <input
                type="text"
                value={recolector.nombre}
                readOnly
                className="border p-2 w-full rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">DNI</label>
              <input
                type="text"
                value={recolector.dni}
                readOnly
                className="border p-2 w-full rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Correo electrónico</label>
              <input
                type="email"
                value={recolector.email}
                readOnly
                className="border p-2 w-full rounded bg-gray-100"
              />
            </div>
            <div
              className={`p-4 rounded text-center max-w-md ${
                recolector.pendiente
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100"
              }`}
            >
              {recolector.pendiente
                ? "El recolector tiene un recorrido pendiente para entregar"
                : "El recolector no tiene recorridos pendientes de entrega"}
            </div>

            {recolector.pendiente && (
              <div className="flex items-center mb-4 mt-4">
                <div className="flex justify-end">
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
            )}
          </div>
        ) : mensaje && dni !== "" ? (
          <div className="p-4 rounded max-w-md bg-red-100 text-red-600 text-center">
            {mensaje}
          </div>
        ) : (
          <div className="max-w-md p-4 rounded bg-gray-100 text-center">
            Ingrese un DNI en el buscador de arriba para iniciar la búsqueda.
          </div>
        )}
      </div>
    </>
  );
};

export default Solicitudes;
