"use client";
import Image from "next/image";
import styles from "./Home.module.css";
import MediaCard from "./MediaCard";
import PlayerFooter from "./PlayerFooter";
import { useContext, useState } from "react";
import { AudioContext } from "../providers/AudioProvider";

const empty = {
  trackname: "",
  tracklink: "",
  trackimg: "",
} as Track;

export default function Home({ data }: { data: any }) {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("AudioContext must be used within an AudioProvider");
  }

  const {
    isPlaying,
    playAudio,
    pauseAudio,
    stopAudio,
    seek,
    currentTime,
    duration,
    volume,
    setVolume,
  } = context;

  const [localVolume, setLocalVolume] = useState(volume);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    setVolume(newVolume);
  };

  return (
    <main className={styles.main}>
      <div>
        <p>Current Time: {currentTime.toFixed(2)}</p>
        <p>Duration: {duration.toFixed(2)}</p>
        <button onClick={playAudio} disabled={isPlaying}>
          Play
        </button>
        <button onClick={pauseAudio} disabled={!isPlaying}>
          Pause
        </button>
        <button onClick={stopAudio}>Stop</button>
        <button onClick={() => seek(currentTime + 10)}>Seek +10s</button>

        <div>
          <label htmlFor="volume">Volume:</label>
          <input
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={localVolume}
            onChange={handleVolumeChange}
          />
          <span>{(localVolume * 100).toFixed(0)}%</span>
        </div>
      </div>
      <header style={{ height: "55px" }}>
        <Image
          src="/images/logo-transparent.png"
          alt="Xwodie Logo"
          width={55}
          height={55}
        />
      </header>
      <div className={styles.player}>
        <div
          style={{
            height: "50vh",
            width: "100%",
            backgroundImage: `url(${data ? data?.trackimg : ""})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            padding: "10px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.8em" }}>
              Kanye West Love Lockdown Kendrick Lamar The Recipe
            </h1>
            <p style={{ color: "darkgray" }}>By Jesse Anthony</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <Image
              src="/images/play-circle-outline.svg"
              alt="Play Circle"
              width={50}
              height={50}
            />
            <Image
              src="/images/cloud-download-outline.svg"
              alt="Download Song"
              width={40}
              height={40}
            />
          </div>
        </div>

        {/* Track List */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
            padding: "10px",
          }}
        >
          <MediaCard></MediaCard>
          <MediaCard></MediaCard>
          <MediaCard></MediaCard>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          backgroundColor: "black",
          zIndex: 1000,
          width: "100%",
        }}
      >
        <PlayerFooter currentTrack={data ?? empty}></PlayerFooter>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "15px",
            height: "50px",
          }}
        >
          <Image
            src="/images/logo/logo-instagram.svg"
            alt="Instagram"
            width={35}
            height={35}
          />
          <Image
            src="/images/logo/logo-soundcloud.svg"
            alt="Soundcloud"
            width={35}
            height={35}
          />
          <Image
            src="/images/logo/logo-tiktok.svg"
            alt="TikTok"
            width={35}
            height={35}
          />
          <Image
            src="/images/logo/logo-youtube.svg"
            alt="Youtube"
            width={35}
            height={35}
          />
        </div>
      </div>
    </main>
  );
}
