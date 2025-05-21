import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { questionId: selectedItemId }

  const setAnswer = (questionId, selectedItemId) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedItemId }));
  };

  const resetQuiz = () => {
    setQuestions([]);
    setAnswers({});
  };

  return (
    <QuizContext.Provider value={{ questions, setQuestions, answers, setAnswer, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);
