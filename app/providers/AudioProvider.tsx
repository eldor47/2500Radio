// context/AudioProvider.tsx
"use client";
// context/AudioProvider.tsx
import React, {
  createContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from "react";

interface AudioContextProps {
  isPlaying: boolean;
  isPaused: boolean;
  playAudio: () => void;
  pauseAudio: () => void;
  stopAudio: () => void;
  seek: (time: number) => void;
  currentTime: number;
  duration: number;
  volume: number;
  setVolume: (volume: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

interface AudioProviderProps {
  children: ReactNode;
  audioUrl: string; // Accept audio URL as a prop
}

export const AudioContext = createContext<AudioContextProps | undefined>(
  undefined
);

export const AudioProvider: React.FC<AudioProviderProps> = ({
  children,
  audioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Volume range is from 0.0 to 1.0

  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const adjustVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setVolume(volume);
    }
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    const audioElement = audioRef.current;
    audioElement?.addEventListener("timeupdate", handleTimeUpdate);
    audioElement?.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioElement?.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement?.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isPaused,
        playAudio,
        pauseAudio,
        stopAudio,
        seek,
        currentTime,
        duration,
        volume,
        setVolume: adjustVolume,
        audioRef,
      }}
    >
      {/* Hidden audio element with dynamic src */}
      <audio ref={audioRef} src={audioUrl} preload="auto" />
      {children}
    </AudioContext.Provider>
  );
};
