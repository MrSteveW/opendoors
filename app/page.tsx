// import { db } from "@/utils/connect";
// import Calendar from "@/components/Calendar";
import Calendar from "@/components/Calendar";
import Sidebar from "@/components/Sidebar";

export default async function Home() {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-row">
      <div className="w-7/10 bg-opencream">
        <Calendar />
      </div>
      <div className="w-3/10">
        <Sidebar />
      </div>
    </div>
  );
}
