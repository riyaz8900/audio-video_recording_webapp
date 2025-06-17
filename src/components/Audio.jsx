import React, { useEffect, useRef, useState } from 'react';
import { FiClock, FiDownload } from 'react-icons/fi';

function Audio() {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [audioURL, setAudioURL] = useState('');
  const [history, setHistory] = useState([]);
  const timerRef = useRef(null);
  const chunks = useRef([]);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (recording && !paused) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [recording, paused]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };
const getRelativeTime = (timestamp) => {
  const now = new Date();
  const recordedTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - recordedTime) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) > 1 ? "s" : ""} ago`;
  if (diffInSeconds < 172800) return "yesterday";

  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

  const startRecording = async () => {
    setTime(0);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => chunks.current.push(e.data);

    recorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);

      const base64 = await blobToBase64(blob);
      saveToLocalStorage(base64);

      chunks.current = [];
    };

    recorder.start();
    setMediaRecorder(recorder);
    setRecording(true);
    setPaused(false);
  };

  const pauseRecording = () => {
    mediaRecorder.pause();
    setPaused(true);
  };

  const resumeRecording = () => {
    mediaRecorder.resume();
    setPaused(false);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
    setPaused(false);
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const saveToLocalStorage = (base64Audio) => {
    const newEntry = {
      id: Date.now(),
      time: new Date().toLocaleString(),
      base64: base64Audio,
    };
    const updated = [newEntry, ...history];
    localStorage.setItem('audioHistory', JSON.stringify(updated));
    setHistory(updated);
  };

  const loadHistory = () => {
    const saved = JSON.parse(localStorage.getItem('audioHistory') || '[]');
    setHistory(saved);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="text-xl font-mono text-gray-700 dark:text-white">
        {recording ? `Recording: ${formatTime(time)}` : 'Not Recording'}
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        {!recording && (
          <button
            onClick={startRecording}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Start Recording
          </button>
        )}
        {recording && !paused && (
          <button
            onClick={pauseRecording}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Pause
          </button>
        )}
        {recording && paused && (
          <button
            onClick={resumeRecording}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Resume
          </button>
        )}
        {recording && (
          <button
            onClick={stopRecording}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Stop
          </button>
        )}
      </div>

      {audioURL && (
        <div className="mt-4 w-full ">
          <audio controls className="w-full">
            <source src={audioURL} type="audio/webm" />
          </audio>
        </div>
      )}

   {history.length > 0 && (
  <div className="mt-6 w-full">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
      Previous Recordings
    </h3>

    <div className="grid grid-cols-1 gap-4 max-h-72 overflow-y-auto pr-1 md:grid-cols-2 lg:grid-cols-3">
      {history.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition duration-200"
        >
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
  <div className="flex items-center gap-2">
    <FiClock className="text-blue-500" />
    {getRelativeTime(item.time)}
  </div>
  <div>{item.time}</div>
</div>


          <audio controls className="w-full rounded overflow-hidden">
            <source src={item.base64} type="audio/webm" />
          </audio>

          <a
            href={item.base64}
            download={`Recording-${item.id}.webm`}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
          >
            <FiDownload />
            Download
          </a>
        </div>
      ))}
    </div>
  </div>
)}

    </div>
  );
}

export default Audio;
