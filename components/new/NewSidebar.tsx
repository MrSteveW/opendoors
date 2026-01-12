import ShowForm from "@/components/new/ShowForm";

export default function NewSidebar() {
  return (
    <div className="h-full bg-openlightgreen flex flex-col items-center p-2">
      <div className="text-2xl ">Date: Monday, 12 January 2026</div>
      <ShowForm />
    </div>
  );
}
