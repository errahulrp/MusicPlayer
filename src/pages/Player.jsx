import React, { useEffect, useState } from 'react';

const Player = () => {
  const [audio, setAudio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    const storedSongs = Object.keys(localStorage).filter((key) =>
      key.includes('audioData')
    );
    setSongs(storedSongs);

    const audioData = localStorage.getItem(
      storedSongs[currentSongIndex]
    );
    if (audioData) {
      const newAudio = new Audio(audioData);
      setAudio(newAudio);
      setAudioEvents(newAudio);
    }
  }, [currentSongIndex]);

  useEffect(() => {
    const audioData = localStorage.getItem(songs[currentSongIndex]);
    if (audioData) {
      const newAudio = new Audio(audioData);
      setAudio(newAudio);
      setAudioEvents(newAudio);
    }
  }, [songs, currentSongIndex]);

  useEffect(() => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }, [currentSongIndex, audio]);

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    };
  }, [audio]);

  const setAudioEvents = (audio) => {
    audio.addEventListener('ended', () => {
      playNextSong();
    });
  };

  const playNextSong = () => {
    const nextIndex =
      currentSongIndex === songs.length - 1
        ? 0
        : currentSongIndex + 1;
    setCurrentSongIndex(nextIndex);
  };

  const handlePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeSong = (index) => {
    setCurrentSongIndex(index);
    handlePlay();
  };

  return (
    <div className="bg-black flex flex-col justify-center items-center h-screen text-white">
      <div className="w-96 h-96 bg-gradient-to-tr to-[#f0a6ca] from-[#efc3e6] shadow-2xl shadow-slate-800 rounded-3xl">
        <div className="flex justify-center mt-36 cursor-pointer">
          <div className={`p-5 bg-gradient-to-tl to-[#ffddd2] from-[#83c5be] rounded-full ${isPlaying ? 'hidden' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.0" stroke="currentColor" className="w-6 h-6" onClick={handlePlay} >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
            </svg>
          </div>
          <div className={`p-5 bg-black rounded-full ${isPlaying ? '' : 'hidden'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.0" stroke="currentColor" className="w-6 h-6" onClick={handlePlay}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="text-white ">
        <div className="flex justify-center pt-10 ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M9.47 15.28a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 1 0-1.06-1.06L10 13.69 6.28 9.97a.75.75 0 0 0-1.06 1.06l4.25 4.25ZM5.22 6.03l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 0 0-1.06-1.06L10 8.69 6.28 4.97a.75.75 0 0 0-1.06 1.06Z" clipRule="evenodd"/>
          </svg>
        </div>
        <div className="mt-10 px-10 py-4 border-[1px] rounded-3xl">
          {songs.map((song, index) => (
            <div key={index} onClick={() => changeSong(index)} className={`cursor-pointer m-4 ${index === currentSongIndex && isPlaying? 'text-yellow-500': ''} `}>
              {song}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Player;
