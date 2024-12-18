"use client";

import { useState } from "react";
import authService from "../services/authService";
import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const response = await authService.logout();
    if (response) {
      authService.deleteCredentials();
    } else {
      alert("Ocurrió un error");
    }
  };

  return (
    <nav className="bg-teal-800 p-4">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center w-full justify-between">
          <div className="flex w-full items-center justify-between">
            <div className="flex-shrink-0">
              <span className="font-bold">
                <svg
                  className="w-24 md:w-[177px] h-auto"
                  viewBox="0 0 177 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.352 19.952H20.484V24.488H8.352V19.952ZM8.784 30.32H22.5V35H2.988V9.8H22.032V14.48H8.784V30.32ZM37.7989 35.288C35.7109 35.288 33.8509 34.868 32.2189 34.028C30.5869 33.164 29.3029 31.976 28.3669 30.464C27.4549 28.952 26.9989 27.236 26.9989 25.316C26.9989 23.372 27.4549 21.656 28.3669 20.168C29.3029 18.656 30.5869 17.48 32.2189 16.64C33.8509 15.776 35.7109 15.344 37.7989 15.344C39.8389 15.344 41.6149 15.776 43.1269 16.64C44.6389 17.48 45.7549 18.692 46.4749 20.276L42.1189 22.616C41.6149 21.704 40.9789 21.032 40.2109 20.6C39.4669 20.168 38.6509 19.952 37.7629 19.952C36.8029 19.952 35.9389 20.168 35.1709 20.6C34.4029 21.032 33.7909 21.644 33.3349 22.436C32.9029 23.228 32.6869 24.188 32.6869 25.316C32.6869 26.444 32.9029 27.404 33.3349 28.196C33.7909 28.988 34.4029 29.6 35.1709 30.032C35.9389 30.464 36.8029 30.68 37.7629 30.68C38.6509 30.68 39.4669 30.476 40.2109 30.068C40.9789 29.636 41.6149 28.952 42.1189 28.016L46.4749 30.392C45.7549 31.952 44.6389 33.164 43.1269 34.028C41.6149 34.868 39.8389 35.288 37.7989 35.288ZM84.859 35.288C82.771 35.288 80.911 34.868 79.279 34.028C77.647 33.164 76.363 31.976 75.427 30.464C74.515 28.952 74.059 27.236 74.059 25.316C74.059 23.372 74.515 21.656 75.427 20.168C76.363 18.656 77.647 17.48 79.279 16.64C80.911 15.776 82.771 15.344 84.859 15.344C86.899 15.344 88.675 15.776 90.187 16.64C91.699 17.48 92.815 18.692 93.535 20.276L89.179 22.616C88.675 21.704 88.039 21.032 87.271 20.6C86.527 20.168 85.711 19.952 84.823 19.952C83.863 19.952 82.999 20.168 82.231 20.6C81.463 21.032 80.851 21.644 80.395 22.436C79.963 23.228 79.747 24.188 79.747 25.316C79.747 26.444 79.963 27.404 80.395 28.196C80.851 28.988 81.463 29.6 82.231 30.032C82.999 30.464 83.863 30.68 84.823 30.68C85.711 30.68 86.527 30.476 87.271 30.068C88.039 29.636 88.675 28.952 89.179 28.016L93.535 30.392C92.815 31.952 91.699 33.164 90.187 34.028C88.675 34.868 86.899 35.288 84.859 35.288ZM100.735 42.272C99.7273 42.272 98.7313 42.116 97.7473 41.804C96.7633 41.492 95.9593 41.06 95.3353 40.508L97.3873 36.512C97.8193 36.896 98.3113 37.196 98.8633 37.412C99.4393 37.628 100.003 37.736 100.555 37.736C101.347 37.736 101.971 37.544 102.427 37.16C102.907 36.8 103.339 36.188 103.723 35.324L104.731 32.948L105.163 32.336L112.111 15.632H117.511L108.763 36.188C108.139 37.748 107.419 38.972 106.603 39.86C105.811 40.748 104.923 41.372 103.939 41.732C102.979 42.092 101.911 42.272 100.735 42.272ZM104.047 35.756L95.4073 15.632H101.203L107.899 31.832L104.047 35.756ZM130.436 35.288C128.348 35.288 126.488 34.868 124.856 34.028C123.224 33.164 121.94 31.976 121.004 30.464C120.092 28.952 119.636 27.236 119.636 25.316C119.636 23.372 120.092 21.656 121.004 20.168C121.94 18.656 123.224 17.48 124.856 16.64C126.488 15.776 128.348 15.344 130.436 15.344C132.476 15.344 134.252 15.776 135.764 16.64C137.276 17.48 138.392 18.692 139.112 20.276L134.756 22.616C134.252 21.704 133.616 21.032 132.848 20.6C132.104 20.168 131.288 19.952 130.4 19.952C129.44 19.952 128.576 20.168 127.808 20.6C127.04 21.032 126.428 21.644 125.972 22.436C125.54 23.228 125.324 24.188 125.324 25.316C125.324 26.444 125.54 27.404 125.972 28.196C126.428 28.988 127.04 29.6 127.808 30.032C128.576 30.464 129.44 30.68 130.4 30.68C131.288 30.68 132.104 30.476 132.848 30.068C133.616 29.636 134.252 28.952 134.756 28.016L139.112 30.392C138.392 31.952 137.276 33.164 135.764 34.028C134.252 34.868 132.476 35.288 130.436 35.288ZM144.04 35V8.288H149.656V35H144.04ZM166.28 35.288C164.072 35.288 162.128 34.856 160.448 33.992C158.792 33.128 157.508 31.952 156.596 30.464C155.684 28.952 155.228 27.236 155.228 25.316C155.228 23.372 155.672 21.656 156.56 20.168C157.472 18.656 158.708 17.48 160.268 16.64C161.828 15.776 163.592 15.344 165.56 15.344C167.456 15.344 169.16 15.752 170.672 16.568C172.208 17.36 173.42 18.512 174.308 20.024C175.196 21.512 175.64 23.3 175.64 25.388C175.64 25.604 175.628 25.856 175.604 26.144C175.58 26.408 175.556 26.66 175.532 26.9H159.8V23.624H172.58L170.42 24.596C170.42 23.588 170.216 22.712 169.808 21.968C169.4 21.224 168.836 20.648 168.116 20.24C167.396 19.808 166.556 19.592 165.596 19.592C164.636 19.592 163.784 19.808 163.04 20.24C162.32 20.648 161.756 21.236 161.348 22.004C160.94 22.748 160.736 23.636 160.736 24.668V25.532C160.736 26.588 160.964 27.524 161.42 28.34C161.9 29.132 162.56 29.744 163.4 30.176C164.264 30.584 165.272 30.788 166.424 30.788C167.456 30.788 168.356 30.632 169.124 30.32C169.916 30.008 170.636 29.54 171.284 28.916L174.272 32.156C173.384 33.164 172.268 33.944 170.924 34.496C169.58 35.024 168.032 35.288 166.28 35.288Z"
                    fill="#E7E7E7"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M59.3583 14.7718L59.3583 14.7718L59.3584 14.7718L59.4261 18.1785L59.4261 18.1785L59.5616 24.9918L56.1549 25.0596L56.0731 20.9462C55.7411 21.2877 55.4462 21.6676 55.1954 22.0801C54.4048 23.3805 54.1044 24.9203 54.3481 26.4225C54.5919 27.9247 55.3639 29.2906 56.5251 30.2742C57.6863 31.2578 59.1605 31.7947 60.6824 31.7881C62.2042 31.7815 63.6737 31.2318 64.8263 30.2381C65.9789 29.2445 66.739 27.872 66.9697 26.3677C67.2004 24.8634 66.8866 23.3262 66.0848 22.0328C65.2829 20.7393 64.0457 19.7746 62.5958 19.3122L63.9342 15.1153C66.3838 15.8965 68.4741 17.5264 69.8289 19.7117C71.1836 21.897 71.7138 24.4941 71.324 27.0355C70.9343 29.577 69.6501 31.8958 67.7027 33.5746C65.7553 35.2535 63.2726 36.1821 60.7015 36.1932C58.1304 36.2044 55.6397 35.2974 53.6778 33.6356C51.7159 31.9737 50.4116 29.6661 49.9998 27.1281C49.588 24.5902 50.0956 21.9886 51.4313 19.7916C51.7502 19.2671 52.1112 18.7739 52.5094 18.316L49.2061 18.3818L49.1384 14.9751L55.9516 14.8396L55.9516 14.8395L59.3583 14.7718Z"
                    fill="#E7E7E7"
                  />
                  <path
                    d="M111.746 38H177V42.8561C152.434 43.1799 104.069 42.8561 107.14 42.8561C110.21 42.8561 111.49 39.295 111.746 38Z"
                    fill="#E7E7E7"
                  />
                </svg>
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <li className="list-none">
                  <Link
                    to="/"
                    className="text-white hover:text-gray-400 md:text-lg"
                  >
                    Home
                  </Link>
                </li>
                {/* links */}
                {!user && (
                  <>
                    <li className="list-none">
                      <Link
                        to="/login"
                        className="text-white hover:text-gray-400 md:text-lg"
                      >
                        Iniciar sesión
                      </Link>
                    </li>
                  </>
                )}

                {user.role === "recolector" && (
                  <>
                    <li className="list-none">
                      <Link
                        to="/form"
                        className="text-white hover:text-gray-400 md:text-lg"
                      >
                        Nuevo recorrido
                      </Link>
                    </li>
                    <li className="list-none">
                      <Link
                        to="/mis-recorridos"
                        className="text-white hover:text-gray-400 md:text-lg"
                      >
                        Mis recorridos
                      </Link>
                    </li>
                    <li className="list-none">
                      <Link
                        to="/"
                        className="text-white hover:text-gray-400 md:text-lg"
                      >
                        Notificaciones
                      </Link>
                    </li>
                  </>
                )}

                {user.role === "depósito" && (
                  <>
                    <li className="list-none">
                      <Link
                        to="/solicitudes"
                        className="text-white hover:text-gray-400 md:text-lg"
                      >
                        Recibir entregas
                      </Link>
                    </li>
                    <li className="list-none">
                      <Link
                        to="/ordenes"
                        className="text-white hover:text-gray-400 md:text-lg"
                      >
                        Órdenes
                      </Link>
                    </li>
                    <li className="list-none">
                      <Link
                        to="/mis-ordenes"
                        className="text-white hover:text-gray-400 md:text-lg"
                      >
                        Mis Órdenes
                      </Link>
                    </li>
                    <li className="list-none">
                      <Link
                        to="/deposito"
                        className="text-white hover:text-gray-400 md:text-lg"
                      >
                        Mi depósito
                      </Link>
                    </li>
                  </>
                )}
                {user && (
                  <li className="list-none">
                    <Link
                      to="/login"
                      className="text-white hover:text-gray-400 md:text-lg"
                      onClick={handleLogout}
                    >
                      Salir
                    </Link>
                  </li>
                )}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Close main menu" : "Open main menu"}
              </span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-50 bg-teal-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Close main menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="mt-8 flex flex-col space-y-3">
            {!user && (
              <>
                <li className="list-none">
                  <Link
                    to="/login"
                    className="text-white hover:text-gray-400 md:text-lg"
                  >
                    Iniciar sesión
                  </Link>
                </li>
              </>
            )}

            {user.role === "recolector" && (
              <>
                <li className="list-none text-end">
                  <Link
                    to="/form"
                    className="text-white hover:text-gray-400 md:text-lg"
                  >
                    Nuevo recorrido
                  </Link>
                </li>
                <li className="list-none text-end">
                  <Link
                    to="/mis-recorridos"
                    className="text-white hover:text-gray-400 md:text-lg"
                  >
                    Mis recorridos
                  </Link>
                </li>
                <li className="list-none text-end">
                  <Link
                    to="/"
                    className="text-white hover:text-gray-400 md:text-lg"
                  >
                    Notificaciones
                  </Link>
                </li>
                <li className="list-none text-end">
                  <Link
                    to="/login"
                    className="text-white hover:text-gray-400 md:text-lg"
                    onClick={handleLogout}
                  >
                    Salir
                  </Link>
                </li>
              </>
            )}

            {user.role === "depósito" && (
              <>
                <li className="list-none">
                  <Link
                    to="/solicitudes"
                    className="text-white hover:text-gray-400 md:text-lg"
                  >
                    Recibir entregas
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/ordenes"
                    className="text-white hover:text-gray-400 md:text-lg"
                  >
                    Órdenes
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/mis-ordenes"
                    className="text-white hover:text-gray-400 md:text-lg"
                  >
                    Mis Órdenes
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/deposito"
                    className="text-white hover:text-gray-400 md:text-lg"
                  >
                    Mi depósito
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/login"
                    className="text-white hover:text-gray-400 md:text-lg"
                    onClick={handleLogout}
                  >
                    Salir
                  </Link>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
