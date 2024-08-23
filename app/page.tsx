import { sql } from "@vercel/postgres";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import { AudioProvider } from "./providers/AudioProvider";
import Home from "./components/Home";

// Gets track list from pg database
async function fetchData() {
  const res = await sql`select * from tracks`;
  console.log(res.rows);
  return res.rows[0];
}

export default async function Page() {
  const data = await fetchData();

  return (
    <ReactQueryProvider>
      <AudioProvider
        audioUrl={
          "https://eldor.s3.us-west-1.amazonaws.com/Kanye_West_Love_Lockdown_Kendrick_Lamar_The_Recipe.mp3.mp3"
        }
      >
        <Home data={data} />
      </AudioProvider>
    </ReactQueryProvider>
  );
}
