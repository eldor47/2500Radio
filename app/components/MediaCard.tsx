import Image from "next/image";
import styles from "./MediaCard.module.css";
import { useState } from "react";
import { motion } from "framer-motion";

const MediaCard = ({
  track,
  selected,
  selectTrack,
}: {
  track: Track;
  selected: boolean;
  selectTrack: Function;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    selectTrack(track);
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`${styles.mediaCard} ${selected ? styles.selected : ""}`}
      initial={{ scale: 1 }}
      animate={{ scale: isClicked ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div>
        <Image
          src={track.trackimg}
          alt="Album Art"
          width={100}
          height={100}
          className={styles.image}
        />
      </div>
      <div className={styles.mediaInfo}>
        <h4>{track.trackname}</h4>
        <p>Mixed by Jesse Anthony</p>
        <span>archives playlist • 2024 • </span>
      </div>
    </motion.div>
  );
};

export default MediaCard;
