import ClassesAdmin from "@/components/admin/ClassesAdmin";
import ProducersAdmin from "@/components/admin/ProducersAdmin";

export default function AdminPage() {
  return (
    <div className="h-screen flex flex-row">
      <div className="w-1/2">
        <ClassesAdmin />
      </div>
      <div className="w-1/2">
        <ProducersAdmin />
      </div>
    </div>
  );
}
