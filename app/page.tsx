'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-lg">
        <h1 className="text-xl font-semibold text-center mb-4">Resume Summary</h1>
        <audio
          ref={audioRef}
          src="/resume-summary.wav"
          preload="metadata"
        />
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={togglePlay}
            className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 focus:outline-none"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-5.197-3.033A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.033a1 1 0 000-1.664z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 rounded-lg appearance-none bg-gray-700 cursor-pointer"
          />
          <span className="text-sm">{formatTime(duration)}</span>
        </div>
      </div>
    </main>
  );
}

// tailwind.config.ts
// import type { Config } from 'tailwindcss';

// const config: Config = {
//   darkMode: 'class',
//   content: [
//     './app/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// export default config;
