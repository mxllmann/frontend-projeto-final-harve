import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-20 bg-white bg-opacity-10 backdrop-blur-sm text-white py-8 px-4 rounded-t-2xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold">QuizAI</h3>
          <p className="text-sm text-gray-200">Aprimore seu conhecimento com inteligência.</p>
        </div>

        <div className="flex gap-6 text-2xl">
          <a
            href="https://github.com/seu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-300 transition"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/seu-usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-300 transition"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="mailto:contato@quizai.com"
            className="hover:text-indigo-300 transition"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} QuizAI. Todos os direitos reservados.
      </div>
    </footer>
  );
}
