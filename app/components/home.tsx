"use client";
import Image from "next/image";
import styles from "./home.module.css";
import MediaCard from "./MediaCard";
import PlayerFooter from "./PlayerFooter";
import { useContext, useEffect, useState } from "react";
import { AudioContext } from "../providers/AudioProvider";
import { motion } from "framer-motion";
import ButtonImage from "./ButtonImage";

const empty = {
  trackname: "",
  tracklink: "",
  trackimg: "",
  id: 0,
} as Track;

export default function Home({ data }: { data: Array<Track> }) {
  const context = useContext(AudioContext);

  // Set first as base track
  const [currentTrack, setCurrentTrack] = useState<Track>(data[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

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
    changeTrack,
    onTrackEnd,
  } = context;

  // Change track with context
  const handleTrackChange = (tracklink: string) => {
    const newTrackUrl = tracklink;
    changeTrack(newTrackUrl);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // 0.2 seconds delay between each child
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Subscribe to the onTrackEnd event
  useEffect(() => {
    const handleTrackEnd = () => {
      console.log(`Track "${currentTrack.trackname}" has ended.`);
      // play next track
      playNextTrack();
    };

    onTrackEnd(handleTrackEnd);
  }, [currentTrack, onTrackEnd]);

  const playNextTrack = () => {
    if (currentTrackIndex + 1 < data.length) {
      selectTrack(data[currentTrackIndex + 1]);
    }
  };

  const selectTrack = (t: Track) => {
    // change track song
    setCurrentTrack(t);
    setCurrentTrackIndex(data.findIndex((a) => a.id === t.id));
    handleTrackChange(t.tracklink);
    playAudio();
  };

  return (
    <main className={styles.main}>
      <header style={{ height: "55px" }}>
        <Image
          src="/images/logo-transparent.png"
          alt="Xwodie Logo"
          width={55}
          height={55}
        />
      </header>
      <div className={styles.player}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            height: "50vh",
            width: "100%",
            backgroundImage: `url(${currentTrack.trackimg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <motion.div
            className={styles.spinner}
            initial={{ rotate: 0 }}
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              repeatType: "loop",
              duration: 2,
              ease: "linear",
            }}
          >
            <Image
              src="/images/logo-transparent.png"
              alt="Spinner Logo"
              width={100}
              height={100}
              className={styles.spinnerImage}
            />
          </motion.div>
        </motion.div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1em",
            flexDirection: "row",
            padding: "10px",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.8em" }}>{currentTrack.trackname}</h1>
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
            {isPlaying ? (
              <ButtonImage
                src="/images/pause-circle-outline.svg"
                alt="Pause Circle"
                width={50}
                height={50}
                onClick={pauseAudio}
              />
            ) : (
              <ButtonImage
                src="/images/play-circle-outline.svg"
                alt="Play Circle"
                width={50}
                height={50}
                onClick={playAudio}
              />
            )}
            <ButtonImage
              src="/images/cloud-download-outline.svg"
              alt="Download Song"
              width={40}
              height={40}
              onClick={() => window.open(currentTrack.tracklink, "_blank")}
            />
          </div>
        </div>

        {/* Track List */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
            padding: "10px",
          }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {data.map((t: Track, index: number) => {
            return (
              <motion.div key={index} variants={fadeIn}>
                <MediaCard
                  track={t}
                  selected={currentTrack.id === t.id}
                  selectTrack={selectTrack}
                />
              </motion.div>
            );
          })}
        </motion.div>
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
        <PlayerFooter
          currentTrack={currentTrack ?? empty}
          skipTrack={playNextTrack}
        ></PlayerFooter>
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
          <ButtonImage
            src="/images/logo/logo-instagram.svg"
            alt="Instagram"
            width={35}
            height={35}
            onClick={() => {
              window.open("https://www.instagram.com/jesseanthony", "_blank");
            }}
          />
          <ButtonImage
            src="/images/logo/logo-soundcloud.svg"
            alt="Soundcloud"
            width={35}
            height={35}
            onClick={() => {
              window.open("https://soundcloud.com/2500xo", "_blank");
            }}
          />
          <ButtonImage
            src="/images/logo/logo-tiktok.svg"
            alt="TikTok"
            width={35}
            height={35}
            onClick={() => {
              window.open(
                "https://www.tiktok.com/@jesseanthony_?lang=en",
                "_blank"
              );
            }}
          />
          <ButtonImage
            src="/images/logo/logo-youtube.svg"
            alt="Youtube"
            width={35}
            height={35}
            onClick={() => {
              window.open("https://kick.com/jesseanthony", "_blank");
            }}
          />
        </div>
      </div>
    </main>
  );
}
