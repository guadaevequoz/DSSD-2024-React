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
    let userRes = authService.getUser();
    const getDeposito = async () => {
      let res = await depositoService.getDepositById(user.depositId);
      if (res) setDeposito(res);
    };

    if (userRes) {
      setUser(userRes);
      if (user) {
        getDeposito();
        console.log(user);
      }
    } else navigate("/login");
  }, []);

  return (
    <>
      <Navbar user={user} />
      <div className="md:p-10 p-4">
        <h1 className="md:text-4xl text-xl font-bold mb-4">Mi deposito</h1>
        <hr className="mb-4" />
        {deposito && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{deposito.name}</h2>
              <p className="text-gray-700">Dirección: {deposito.address}</p>
              <p className="text-gray-700">
                Email de contacto: {deposito.contactEmail}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Materiales en Stock</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {deposito.stock.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg shadow-sm">
                    <p className="font-bold text-lg">{item.material.name}</p>
                    <p>
                      Cantidad: {item.amount} {item.material.unit}
                    </p>
                    <p>Precio por unidad: ${item.material.pricePerUnit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Empleados</h3>
              {deposito.employees.map((employee) => (
                <div
                  key={employee.id}
                  className="p-4 border-b last:border-none"
                >
                  <p>
                    <span className="font-semibold">Nombre:</span>{" "}
                    {employee.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {employee.email}
                  </p>
                  <p>
                    <span className="font-semibold">DNI:</span> {employee.dni}
                  </p>
                  <p>
                    <span className="font-semibold">Usuario:</span>{" "}
                    {employee.username}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Deposito;
