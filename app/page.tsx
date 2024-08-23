import { sql } from "@vercel/postgres";
import { ReactQueryProvider } from "./providers/ReactQueryProvider";
import Home from "./components/home";

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
      <Home data={data} />
    </ReactQueryProvider>
  );
}
