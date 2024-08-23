import { sql } from "@vercel/postgres";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import Home from "./home";

// Need call to get track list info
// getTrackList

async function fetchData() {
  // Fake fetch
  const res = await sql`select * from tracks`;
  console.log(res.rows);
  return res.rows;
}

export default async function Page() {
  const data = await fetchData();

  return (
    <ReactQueryProvider>
      <Home data={data} />
    </ReactQueryProvider>
  );
}
