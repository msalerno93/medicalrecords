import React, { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const [isEdit, setIsEdit] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-8 z-10 w-1/3 relative">
        <button 
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {!isEdit ? (
          <>
            <h2 className="text-2xl mb-4">Modal Title</h2>
            <p className="mb-6">This is the content of the modal.</p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsEdit(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button 
                onClick={() => alert('View button clicked')}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                View
              </button>
              <button 
                onClick={() => alert('Delete button clicked')}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl mb-4">Edit Modal</h2>
            <input 
              type="text" 
              className="border mb-4 p-2 w-full rounded-md" 
              placeholder="Input Field 1"
            />
            <input 
              type="text" 
              className="border mb-4 p-2 w-full rounded-md" 
              placeholder="Input Field 2"
            />
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsEdit(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
