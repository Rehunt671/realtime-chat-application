import React from 'react';

interface ModalProps {
  title: string;
  actionText: string;
  placeHolder: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const Modal: React.FC<ModalProps> = ({ title, actionText, placeHolder, isOpen, onClose, onSubmit, input, setInput }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full sm:w-96 max-w-md transform transition-all duration-300 ease-in-out">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">{title}</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeHolder}
          className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 transition-all duration-200 ease-in-out"
        />
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-400 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="w-full py-3 bg-blue-500 rounded-lg text-white font-medium hover:bg-blue-600 transition duration-200 ease-in-out"
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
