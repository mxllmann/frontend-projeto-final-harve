import React from 'react';
import { Link } from 'react-router-dom';

export default function QuizCard({ id, title, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden flex flex-col h-full p-4">
      <div className="h-40 w-full overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex-grow overflow-hidden">
        {title}
      </h3>
      <Link
        to={`/quiz/${id}`}
        className="mt-auto inline-block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Saiba mais
      </Link>
    </div>
  );
}
