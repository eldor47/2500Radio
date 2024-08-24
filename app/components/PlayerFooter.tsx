import Image from "next/image";
import styles from "./PlayerFooter.module.css";
import { useContext } from "react";
import { AudioContext } from "../providers/AudioProvider";
import ButtonImage from "./ButtonImage";

const PlayerFooter = (props: { currentTrack: Track; skipTrack: Function }) => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("AudioContext must be used within an AudioProvider");
  }

  const { isPlaying, playAudio, pauseAudio } = context;

  return (
    <div className={styles.mediaCard}>
      <Image
        src={props.currentTrack.trackimg}
        alt="Album Art"
        width={70}
        height={70}
        className={styles.image}
      />
      <div className={styles.mediaInfo}>
        <h4>{props.currentTrack.trackname}</h4>
        <p>{props.currentTrack.trackname}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "15px",
        }}
      >
        {isPlaying ? (
          <ButtonImage
            src="/images/pause-circle-outline.svg"
            alt="Pause Circle"
            width={40}
            height={40}
            onClick={pauseAudio}
          />
        ) : (
          <ButtonImage
            src="/images/play-circle-outline.svg"
            alt="Play Circle"
            width={40}
            height={40}
            onClick={playAudio}
          />
        )}
        <ButtonImage
          src="/images/play-forward-outline.svg"
          alt="Skip Track"
          width={40}
          height={40}
          onClick={() => props.skipTrack()}
        />
      </div>
    </div>
  );
};

export default PlayerFooter;
