import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import QuizCard from '../components/QuizCard';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/quiz`)
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar quizzes:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-8 px-4 scroll-smooth">
      <div className="max-w-6xl mx-auto">

        {/* Apresentação animada */}
        <motion.section
          className="mb-20 bg-white backdrop-blur-lg rounded-2xl p-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Bem-vindo ao QuizAI
          </h2>
          <p className="text-gray-600 text-center mb-8">
            O QuizAI é a plataforma perfeita para testar e aprimorar seus conhecimentos em diversas áreas.
            Aqui, você encontra quizes interativos, com design moderno e foco em Inteligência Artificial e Aprendizado.
          </p>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-5xl mb-2">⚡️</span>
              <h3 className="text-xl font-semibold mb-1 text-gray-600" >Alta Performance</h3>
              <p className="text-gray-600">
                Respostas rápidas e precisas graças ao React e otimizações de desempenho.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-5xl mb-2 ">🤖</span>
              <h3 className="text-xl font-semibold mb-1 text-gray-600">Tecnologia de Ponta</h3>
              <p className="text-gray-600">
                IA e Machine Learning integradas para criar quizzes dinâmicos e inteligentes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-5xl mb-2">🚀</span>
              <h3 className="text-xl font-semibold mb-1 text-gray-600">Interface Modernizada</h3>
              <p className="text-gray-600">
                Layout leve, responsivo e pensado para maximizar sua performance de estudo.
              </p>
            </div>
          </div>

          {/* Botão para rolar até os quizzes */}
          <div className="text-center">
            <button
              onClick={() => {
                const section = document.getElementById("quizzes");
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Ver Quizzes
            </button>
          </div>
        </motion.section>

        {/* Quizzes */}
        <motion.section
        className="mb-20 from-indigo-500 to-purple-600 bg-opacity-90 backdrop-blur-lg rounded-2xl p-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}>
        <h1
          id="quizzes"
          className="text-4xl font-bold text-white text-center mb-12"
        >
          Quizzes Disponíveis
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              image={quiz.image_url}
            />
          ))}
        </div>
        </motion.section>
      </div>
    </div>
  );
}
