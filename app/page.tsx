// import { db } from "@/utils/connect";
// import Calendar from "@/components/Calendar";

export default async function Home() {
  return (
    <div className="h-screen bg-amber-300 flex flex-row">
      <div className="w-7/10 h-full bg-opencream">
        <h1>I`m the calendar</h1>
      </div>
      <div className="w-3/10 h-full bg-red-200"></div>
    </div>
  );
}
