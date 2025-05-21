import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config';
import { useQuiz } from "../context/QuizContext";

export default function QuizDetails() {
  const { idQuiz } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setQuestions, resetQuiz } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/quiz/${idQuiz}`)
      .then((res) => {
        setQuiz(res.data);
      })
      .catch(() => setError("Quiz não encontrado ou erro de rede."))
      .finally(() => setLoading(false));
  }, [idQuiz]);

  const iniciarQuiz = async () => {
    try {
      resetQuiz(); // limpa tentativas anteriores
      const res = await axios.get(`${API_BASE_URL}/question/quiz/${idQuiz}`);
      setQuestions(res.data); // guarda no contexto
      navigate(`/quiz/${idQuiz}/execucao`);;
    } catch (err) {
      console.error(err);
      alert("Erro ao iniciar o quiz.");
    }
  };

  if (loading)
    return <div className="text-center py-10 text-white">Carregando...</div>;
  if (error)
    return <div className="text-center py-10 text-red-300">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="relative">
          <img
            src={quiz.image_url}
            alt={quiz.title}
            className="w-full h-64 object-cover"
          />

          <Link
            to="/"
            className="absolute top-4 left-4 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
          <p className="text-gray-600">{quiz.description}</p>
          <button
            onClick={iniciarQuiz}
            className="mt-6 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Iniciar Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
