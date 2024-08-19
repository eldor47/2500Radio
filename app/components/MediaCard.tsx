import Image from 'next/image';
import styles from './MediaCard.module.css';

const MediaCard = () => {
  return (
    <div className={styles.mediaCard}>
      <Image 
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIDEAoQm7jyggAAAAh0RVh0Q29tbWVudAD2zJa/AAAAFElEQVR42mP8//8/AxJgYkAFpPIB6vYDB8ciUl8AAAAASUVORK5CYII=" 
        alt="Album Art" 
        width={100} 
        height={100} 
        className={styles.image} 
      />
      <div className={styles.mediaInfo}>
        <h4>You Look Lonely I Can Fix That, Lord Fubu</h4>
        <p>Never Leave You Lonely.mp3</p>
        <span>adilet otorbaev • 2M plays • 2:14 • 2y</span>
      </div>
    </div>
  );
};

export default MediaCard;