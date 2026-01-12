// import { db } from "@/utils/connect";
// import Calendar from "@/components/Calendar";
import NewCalendar from "@/components/new/NewCalendar";
import NewSidebar from "@/components/new/NewSidebar";

export default async function Home() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-row">
      <div className="w-7/10 bg-opencream">
        <NewCalendar />
      </div>
      <div className="w-3/10">
        <NewSidebar />
      </div>
    </div>
  );
}
