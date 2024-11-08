"use client";
import React, {
  createContext,
  useState,
  useRef,
  ReactNode,
  useEffect,
  useCallback,
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
  changeTrack: (url: string) => void;
  onTrackEnd: (callback: () => void) => void; // New function to register a track end callback
}

interface AudioProviderProps {
  children: ReactNode;
  initialAudioUrl: string;
}

export const AudioContext = createContext<AudioContextProps | undefined>(
  undefined
);

export const AudioProvider: React.FC<AudioProviderProps> = ({
  children,
  initialAudioUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [audioUrl, setAudioUrl] = useState(initialAudioUrl);

  const audioRef = useRef<HTMLAudioElement>(null);
  const trackEndCallbackRef = useRef<() => void>(() => {});

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

  const changeTrack = (url: string) => {
    if (audioRef.current) {
      const audioElement = audioRef.current;

      // Stop and reset the current audio
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
      setIsPaused(true);

      // Update the audio source and load the new track
      setAudioUrl(url);
      audioElement.src = url;
      audioElement.load();

      const handlePlay = () => {
        setCurrentTime(0);
        setIsPlaying(true);
        setIsPaused(false);
      };

      const handlePlaybackError = (error: any) => {
        console.error("Playback error:", error);
        // Fallback: if playback fails, you could prompt the user to tap to play
        alert(
          "Playback was interrupted. Please tap the play button to resume."
        );
      };

      const handleLoadedData = () => {
        audioElement.removeEventListener("loadeddata", handleLoadedData);

        // Attempt to play the audio after it's loaded
        audioElement.play().then(handlePlay).catch(handlePlaybackError);
      };

      audioElement.addEventListener("loadeddata", handleLoadedData);
    }
  };

  const onTrackEnd = useCallback((callback: () => void) => {
    trackEndCallbackRef.current = callback;
  }, []);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);

        // Check if the track has ended
        if (audioRef.current.currentTime === audioRef.current.duration) {
          trackEndCallbackRef.current();
        }
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
        changeTrack,
        onTrackEnd, // Provide the onTrackEnd function in the context
      }}
    >
      {/* Hidden audio element with dynamic src */}
      <audio ref={audioRef} src={audioUrl} preload="auto" autoPlay={true} />
      {children}
    </AudioContext.Provider>
  );
};
