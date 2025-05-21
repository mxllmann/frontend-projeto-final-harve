// src/utils/alerts.js
import Swal from 'sweetalert2';

export const showSuccess = (title, text) => {
  Swal.fire({
    icon: 'success',
    title,
    text,
    confirmButtonColor: '#6366F1', // Tailwind Indigo-500
  });
};

export const showError = (title, text) => {
  Swal.fire({
    icon: 'error',
    title,
    text,
    confirmButtonColor: '#DC2626', // Tailwind Red-600
  });
};

export const showWarning = (title, text) => {
  Swal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonColor: '#F59E0B', // Tailwind Amber-500
  });
};
