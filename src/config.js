// src/config.js

// Detecta se é Vite ou CRA e escolhe a variável correta
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";               // Fallback padrão
