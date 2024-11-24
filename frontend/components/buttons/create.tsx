import React from 'react';

interface CreateButtonProps {
  text: string;
  onClick: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center gap-3 hover:animate-pulse"
    >
      {/* Plus SVG Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16M4 12h16" />
      </svg>
      {text}
    </button>
  );
};

export default CreateButton;
