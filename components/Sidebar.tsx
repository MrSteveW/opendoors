import ShowForm from "@/components/ShowForm";
import AddButton from "@/components/AddButton";
import CancelButton from "@/components/CancelButton";
import { db } from "@/utils/connect";

export default async function NewSidebar() {
  const [classNames, producers, times] = await Promise.all([
    db.query(`SELECT * FROM classes`),
    db.query(`SELECT * FROM producers`),
    db.query(`SELECT * FROM times`),
  ]);
  const formData = {
    classNames: classNames.rows,
    producers: producers.rows,
    times: times.rows,
  };

  return (
    <div className="h-full bg-openlightgreen flex flex-col items-center p-2">
      <div className="text-2xl ">Date: Monday, 12 January 2026</div>
      <ShowForm {...formData} />
      <div className="">
        <AddButton />
        <CancelButton />
      </div>
    </div>
  );
}
