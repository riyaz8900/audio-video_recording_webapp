import React, { useEffect, useRef, useState } from 'react';
import { FiClock, FiDownload } from 'react-icons/fi';
import Modal from './Modal';
import { FaRegShareSquare } from "react-icons/fa";

function Video() {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [time, setTime] = useState(0);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
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

  const startRecording = async () => {
    setTime(0);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => chunks.current.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);

      const base64 = await blobToBase64(blob);
      saveToLocalStorage(base64);

      chunks.current = [];
      stream.getTracks().forEach((track) => track.stop());
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

  const blobToBase64 = (blob) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

  const saveToLocalStorage = (base64Video) => {
    const newEntry = {
      id: Date.now(),
      time: new Date().toLocaleString(),
      base64: base64Video,
    };
    const updated = [newEntry, ...history];
    localStorage.setItem('videoHistory', JSON.stringify(updated));
    setHistory(updated);
  };

  const loadHistory = () => {
    const saved = JSON.parse(localStorage.getItem('videoHistory') || '[]');
    setHistory(saved);
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

  return (
    <>
      {/* <Modal showModal={showModal} setShowModal={setShowModal} /> */}
      <div>
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
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
      <div className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 w-full space-y-4">
            <div className="text-center text-xl font-mono text-gray-700 dark:text-white">
              {recording ? `Recording: ${formatTime(time)}` : 'Not Recording'}
            </div>

            <video ref={videoRef} autoPlay muted className="w-full h-64 bg-black rounded-lg shadow-md" />

            <div className="flex flex-wrap gap-3 justify-center">
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

            {videoURL && (
              <div className="mt-4">
                <video controls className="w-full h-64 rounded-md shadow-md">
                  <source src={videoURL} type="video/webm" />
                </video>
              </div>
            )}
          </div>

          <div className="md:w-1/2 w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Previous Recordings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-1">
              {history.length === 0 && (
                <div className="text-gray-500 dark:text-gray-400">No recordings yet</div>
              )}
              {history.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm flex flex-col gap-2">
                  <div className='flex items-center justify-between'>
                    <span className="text-sm text-gray-600 dark:text-gray-300 bg-yellow-300 p-1 rounded-full px-2">{getRelativeTime(item.time)}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.time}</span>
                  </div>
                  <video controls className="w-full h-36 rounded-md">
                    <source src={item.base64} type="video/webm" />
                  </video>
                  <div className='flex items-center justify-between'>
                    <a
                      href={item.base64}
                      download={`Recording-${item.id}.webm`}
                      className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
                    >
                      <FiDownload className="text-base" />
                      Download
                    </a>
                    <button
                      onClick={() => setShowModal(true)}
                      className="cursor-pointer flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md transition"
                    >
                      <FaRegShareSquare className="text-base" />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>

  );
}

export default Video;
