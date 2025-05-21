// Importa funções do React
import { createContext, useContext, useState } from 'react';

// Cria um novo contexto chamado QuizContext
const QuizContext = createContext();

// Componente que provê o contexto para os filhos
export function QuizProvider({ children }) {
  // Estado com as perguntas do quiz
  const [questions, setQuestions] = useState([]);

  // Estado com as respostas do usuário (formato: { idPergunta: idItemSelecionado })
  const [answers, setAnswers] = useState({});

  // Função para registrar a resposta de uma pergunta
  const setAnswer = (questionId, selectedItemId) => {
    // Atualiza o estado de respostas mantendo as anteriores
    setAnswers(prev => ({ ...prev, [questionId]: selectedItemId }));
  };

  // Função para reiniciar o quiz (útil quando inicia um novo)
  const resetQuiz = () => {
    setQuestions([]);
    setAnswers({});
  };

  // Retorna o provedor do contexto, passando os dados e funções
  return (
    <QuizContext.Provider value={{ questions, setQuestions, answers, setAnswer, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

// Hook customizado para acessar os dados do contexto
export const useQuiz = () => useContext(QuizContext);
