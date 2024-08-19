import Image from "next/image";
import styles from "./page.module.css";
import MediaCard from "./components/MediaCard";

export default function Home() {
  return (
    <main /*className={styles.main}*/>
      <header style={{height: "50px"}}>Jess Anthony</header>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "start"}}>
        <div style={{height: "50vh", width: "100%", backgroundColor: "lightgray"}}> img </div>
        <div style={{display: "flex", justifyContent: "center", flexDirection: "row", padding: "10px"}}>
          <div>
            <h1>Kanye West Love Lockdown Kendrick Lamar The Recipe</h1>
            <p>By Jesse Anthony</p>
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
            <div>Play</div>
            <div>Download</div>
          </div>
        </div>


        {/* Track List */}
        <div style={{display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px", padding: "10px"}}>
          <MediaCard></MediaCard>
          <MediaCard></MediaCard>
          <MediaCard></MediaCard>
        </div>

      </div>

      
      {/* Footer */}
      <div style={{position: "fixed", bottom: 0, left: 0, backgroundColor: "#3f3f3f", zIndex: 1000, width: "100%"}}>
        <div>Player</div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", gap: "15px"}}>
          <Image 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIDEAoQm7jyggAAAAh0RVh0Q29tbWVudAD2zJa/AAAAFElEQVR42mP8//8/AxJgYkAFpPIB6vYDB8ciUl8AAAAASUVORK5CYII=" 
            alt="Album Art" 
            width={40} 
            height={40}
          />
          <Image 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIDEAoQm7jyggAAAAh0RVh0Q29tbWVudAD2zJa/AAAAFElEQVR42mP8//8/AxJgYkAFpPIB6vYDB8ciUl8AAAAASUVORK5CYII=" 
            alt="Album Art" 
            width={40} 
            height={40}
          />
          <Image 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIDEAoQm7jyggAAAAh0RVh0Q29tbWVudAD2zJa/AAAAFElEQVR42mP8//8/AxJgYkAFpPIB6vYDB8ciUl8AAAAASUVORK5CYII=" 
            alt="Album Art" 
            width={40} 
            height={40}
          />
          <Image 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gIDEAoQm7jyggAAAAh0RVh0Q29tbWVudAD2zJa/AAAAFElEQVR42mP8//8/AxJgYkAFpPIB6vYDB8ciUl8AAAAASUVORK5CYII=" 
            alt="Album Art" 
            width={40} 
            height={40}
          />
        </div>
      </div>
    </main>
  );
}
