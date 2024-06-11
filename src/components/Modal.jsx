import React, { useState } from "react";

const Modal = ({ isOpen, onClose, children, formTitle, setIsDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-blue-300 rounded-lg shadow-lg p-8 z-10 w-[50%] h-[65%] relative">
        <button
          onClick={() => {
            if (formTitle === "Delete Insurance") {
              setIsDelete(false);
            }
            onClose();
          }}
          className="absolute top-0 right-0 mr-2 text-4xl font-bold text-red-500 hover:text-red-700"
        >
          &times;
        </button>
        <h1 className="text-center font-bold text-3xl pb-2">{formTitle}</h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
