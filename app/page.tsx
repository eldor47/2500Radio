import { sql } from "@vercel/postgres";
import { AudioProvider } from "./providers/AudioProvider";
import Home from "./components/home";

// Gets track list from pg database
async function fetchData() {
  const res = await sql`select * from tracks`;
  console.log(res.rows);
  return res.rows;
}

export default async function Page() {
  const data = (await fetchData()) as Array<Track>;

  return (
    <AudioProvider initialAudioUrl={data[0].tracklink}>
      <Home data={data} />
    </AudioProvider>
  );
}
