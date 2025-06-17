import React, { useState } from 'react';
import Audio from './Audio';
import Video from './Video';
import { FaMicrophone, FaVideo } from 'react-icons/fa';

function Home() {
  const [mode, setMode] = useState('audio');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-all">
      <div className="container mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full text-center">
        <h1 className="text-4xl font-semibold mb-6 text-gray-800 dark:text-white">
          {mode === 'audio' ? 'Audio Recorder' : 'Video Recorder'}
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode('audio')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
              mode === 'audio'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <FaMicrophone />
            Audio Mode
          </button>
          <button
            onClick={() => setMode('video')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
              mode === 'video'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <FaVideo />
            Video Mode
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
          {mode === 'audio' ? <Audio /> : <Video />}
        </div>
      </div>
    </div>
  );
}

export default Home;
