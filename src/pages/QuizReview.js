// src/pages/QuizReview.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function QuizReview() {
  const { idQuiz } = useParams();
  const navigate = useNavigate();
  const { answers, questions } = useQuiz();

  const [resumo, setResumo] = useState([]);
  const [mostrarPontuacao, setMostrarPontuacao] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let scoreTemp = 0;
    const resumoMontado = questions.map((q) => {
      const respostaSelecionada = q.items.find(
        (item) => item.id === answers[q.id]
      );
      const respostaCorreta = q.items.find((item) => item.is_correct);
      const acertou = respostaSelecionada?.id === respostaCorreta?.id;
      if (acertou) scoreTemp++;
      return {
        pergunta: q.question,
        respostaUsuario: respostaSelecionada?.afirmation || "Não respondida",
        correta: respostaCorreta?.afirmation || "Indefinida",
        corretaBool: acertou,
        index: questions.findIndex(quest => quest.id === q.id)
      };
    });
    setResumo(resumoMontado);
    setScore(scoreTemp);
  }, [answers, questions]);

  const gerarResumoHTML = () => {
    return `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #4F46E5">Resumo do seu Quiz</h2>
        <p>Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.</p>
        <hr/>
        <ol style="padding-left: 20px;">
          ${resumo
            .map(
              (item, index) => `
            <li style="margin-bottom: 12px;">
              <p><strong>${index + 1}. ${item.pergunta}</strong></p>
              <p style="margin: 0;">Sua resposta: <span style="color: #1E40AF">${item.respostaUsuario}</span></p>
              ${
                item.corretaBool
                  ? '<p style="margin: 0; color: green;">✔️ Correta</p>'
                  : `<p style="margin: 0; color: red;">❌ Errada</p>
                     <p style="margin: 0;">Resposta correta: <strong>${item.correta}</strong></p>`
              }
            </li>
          `
            )
            .join("")}
        </ol>
        <p style="font-size: 13px; color: #888">Obrigado por utilizar o QuizAI 🚀</p>
      </div>
    `;
  };

  const handleConfirmar = () => {
    setMostrarPontuacao(true);
  };

  const handleEditar = (index) => {
    navigate(`/quiz/${idQuiz}/execucao?pergunta=${index}`);
  };

  const handleSubmitFinal = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Usuário não autenticado");
    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/test`, {
        score,
        quiz_id: idQuiz,
        user_id: userId,
      });

      await axios.post(`${API_BASE_URL}/email/send`, {
        userId,
        html: gerarResumoHTML(),
      });

      alert("Teste enviado com sucesso! Você receberá um e-mail com o resumo.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar o teste.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 p-8 text-white">
      <div className="max-w-4xl mx-auto bg-white text-black p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Revisão Final</h1>

        {mostrarPontuacao && (
          <p className="text-center mb-6 text-lg">
            Você acertou {score} de {questions.length} perguntas.
          </p>
        )}

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {resumo.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${
                mostrarPontuacao
                  ? item.corretaBool
                    ? "bg-green-50 border-green-400"
                    : "bg-red-50 border-red-400"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold mb-1">
                  {idx + 1}. {item.pergunta}
                </h3>
                <button
                  onClick={() => handleEditar(item.index)}
                  className="text-sm bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
              </div>
              <p>
                <strong>Sua resposta:</strong> {item.respostaUsuario}
              </p>
              {mostrarPontuacao && !item.corretaBool && (
                <p>
                  <strong>Correta:</strong> {item.correta}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8 space-x-4">
          {!mostrarPontuacao ? (
            <button
              onClick={handleConfirmar}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Conferir Respostas
            </button>
          ) : (
            <button
              onClick={handleSubmitFinal}
              disabled={submitting}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Confirmar e Enviar Resultado"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
