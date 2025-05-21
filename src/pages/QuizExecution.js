// src/pages/QuizExecution.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useQuiz } from '../context/QuizContext';

export default function QuizExecution() {
  const { idQuiz } = useParams();
  const [searchParams] = useSearchParams();
  const { questions, setQuestions, answers, setAnswer } = useQuiz();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarOuUsarPerguntas = async () => {
      // Se as perguntas já foram carregadas anteriormente
      if (questions.length > 0) {
        const indexParam = parseInt(searchParams.get("pergunta"), 10);
        if (!isNaN(indexParam) && indexParam >= 0 && indexParam < questions.length) {
          setCurrentIndex(indexParam);
        } else {
          setCurrentIndex(0);
        }
        setLoading(false);
      } else {
        // Se ainda não foram carregadas, buscar da API
        try {
          const res = await axios.get(`${API_BASE_URL}/question/quiz/${idQuiz}`);
          setQuestions(res.data);
          const indexParam = parseInt(searchParams.get("pergunta"), 10);
          if (!isNaN(indexParam) && indexParam >= 0 && indexParam < res.data.length) {
            setCurrentIndex(indexParam);
          } else {
            setCurrentIndex(0);
          }
        } catch (err) {
          console.error(err);
          alert("Erro ao carregar questões do quiz.");
        } finally {
          setLoading(false);
        }
      }
    };

    carregarOuUsarPerguntas();
  }, [idQuiz, searchParams]);

  const currentQuestion = questions[currentIndex];
  const selected = currentQuestion ? answers[currentQuestion.id] : null;

  const handleSelect = (itemId) => {
    setAnswer(currentQuestion.id, itemId);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    navigate(`/quiz/${idQuiz}/review`);
  };

  if (loading) return <div className="text-center py-10 text-white">Carregando...</div>;
  if (!currentQuestion) return <div className="text-center py-10 text-white">Nenhuma pergunta disponível.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white text-black p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Pergunta {currentIndex + 1} de {questions.length}</h2>
        <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>

        <ul className="space-y-2">
          {Array.isArray(currentQuestion.items) && currentQuestion.items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-4 py-2 border rounded-lg transition-all
                ${selected === item.id ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {item.afirmation}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
          >
            Voltar
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Próxima
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Enviar Respostas
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
