import React from "react";
import { Link } from "react-router-dom";
import InteractiveMenu from "./MenuInteractive";

export function Navbar() {
  return (
    <nav className="bg-white fixed w-full z-50 top-0 border-b border-pink-100 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        <h2 className="text-2xl font-bold text-pink-400">
          Spa Sentirse Bien
        </h2>
        <ul className="flex gap-6 items-center">
          <li>
            <Link
              to="/"
              className="text-xl text-gray-800 hover:text-pink-400 transition duration-300"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/servicios"
              className="text-xl text-gray-800 hover:text-pink-400 transition duration-300"
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              className="text-xl text-gray-800 hover:text-pink-400 transition duration-300"
            >
              Contacto
            </Link>
          </li>
          <li>
            <Link
              to="/sobrenosotros"
              className="text-xl text-gray-800 hover:text-pink-400 transition duration-300"
            >
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <InteractiveMenu />
          </li>
        </ul>
      </div>
    </nav>
  );
}