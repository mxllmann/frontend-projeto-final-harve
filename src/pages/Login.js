import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { motion } from 'framer-motion';
import { showSuccess, showError, showWarning } from '../utils/alert'

export default function Login({ setUsername }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    emailOrUsername: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? `${API_BASE_URL}/user/login` : `${API_BASE_URL}/user`;

    const payload = isLogin
      ? {
          password: formData.password,
          email: formData.emailOrUsername.includes("@")
            ? formData.emailOrUsername
            : "",
          user: !formData.emailOrUsername.includes("@")
            ? formData.emailOrUsername
            : "",
        }
      : {
          email: formData.email,
          user: formData.username,
          password: formData.password,
        };

    if (!isLogin && formData.password !== formData.confirmPassword) {
      return showWarning('As senhas não conferem!')
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin && data.token) {
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userId", data.id);

          try {
            const resUser = await fetch(
              `${API_BASE_URL}/user/${data.id}/username`
            );
            const userData = await resUser.json();
            localStorage.setItem("username", userData.username);
            if (setUsername) setUsername(userData.username);
          } catch (e) {
            console.error("Erro ao buscar username descriptografado", e);
          }

          navigate("/");
        } else {
          showSuccess(data.feedback);
        }
      } else {
        showError(data.feedback || "Erro no login/cadastro.");
      }
    } catch (err) {
      console.error(err);
      showError("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-xl max-w-md w-full p-8"
      >
        <div className="flex items-center justify-center mb-6">
          <span className="text-5xl">🧠</span>
          <h1 className="text-3xl font-bold text-gray-800 ml-2">Harve Quizzer</h1>
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          {isLogin ? "Entrar" : "Criar Conta"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 "
              />
            </div>
          )}

          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-1">E-mail</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 "
              />
            </div>
          )}

          {isLogin && (
            <div>
              <label className="block text-gray-700 mb-1">
                E-mail ou Username
              </label>
              <input
                name="emailOrUsername"
                type="text"
                value={formData.emailOrUsername}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 "
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-1">Senha</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 "
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-1">
                Confirmar Senha
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 "
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:underline font-medium"
          >
            {isLogin ? "Cadastre-se" : "Entrar"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
