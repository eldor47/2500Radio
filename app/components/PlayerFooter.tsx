import Image from 'next/image';
import styles from './PlayerFooter.module.css';

const PlayerFooter = (props: {currentTrack: Track}) => {
  return (
    <div className={styles.mediaCard}>
      <Image 
        src={props.currentTrack.trackImg} 
        alt="Album Art" 
        width={70} 
        height={70} 
        className={styles.image} 
      />
      <div className={styles.mediaInfo}>
        <h4>You Look Lonely I Can Fix That, Lord Fubu</h4>
        <p>Never Leave You Lonely.mp3</p>
      </div>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "15px"}}>
        <Image 
            src="/images/play-circle-outline.svg"
            alt="Play Circle" 
            width={33} 
            height={33}
          />
        <Image 
            src="/images/play-forward-outline.svg"
            alt="Skip Track" 
            width={33} 
            height={33}
          />
      </div>
    </div>
  );
};

export default PlayerFooter;