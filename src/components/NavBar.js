// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar({ user }) {
  return (
    
    <header className="bg-white backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Saudação */}
        <div className="text-lg font-medium text-gray-800">
          Olá, {user}
        </div>

        {/* Menu de navegação */}
        <nav className="space-x-8">
          <Link
            to="/"
            className="text-gray-600 hover:text-indigo-600 transition"
          >
            Home
          </Link>
          <Link
            to="/perfil"
            className="text-gray-600 hover:text-indigo-600 transition"
          >
            Perfil
          </Link>
          <Link
            to="/sobre"
            className="text-gray-600 hover:text-indigo-600 transition"
          >
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}
