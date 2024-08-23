"use client";
import Image from "next/image";
import styles from "./page.module.css";
import MediaCard from "./components/MediaCard";
import PlayerFooter from "./components/PlayerFooter";
import { useQuery } from "@tanstack/react-query";

const empty = {
  trackname: "",
  tracklink: "",
  trackimg: "",
};

export default function Home({ data }: { data: any }) {
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
