import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import QuizDetails from "../pages/QuizDetails";
import QuizExecution from "../pages/QuizExecution";
import QuizReview from "../pages/QuizReview";
import { QuizProvider } from "../context/QuizContext";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
}

export default function RouteApp({ setUsername }) {
  return (
    <QuizProvider>
      <Routes>
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:idQuiz"
          element={
            <PrivateRoute>
              <QuizDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:idQuiz/review"
          element={
            <PrivateRoute>
              <QuizReview />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:idQuiz/execucao"
          element={
            <PrivateRoute>
              <QuizExecution />
            </PrivateRoute>
          }
        />
      </Routes>
    </QuizProvider>
  );
}
