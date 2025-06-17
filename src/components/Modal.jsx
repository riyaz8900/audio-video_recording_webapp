import React,{useState} from 'react'

function Modal() {
    const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal && (
  <div className="fixed inset-0 z-100 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Unlock Sharing</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Sharing this recording is available for members only. Please become a member to continue.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setShowModal(false);
          }}
          className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded"
        >
          Become a Member
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default Modal
