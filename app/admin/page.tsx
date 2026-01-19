import ClassesAdmin from '@/components/admin/ClassesAdmin';
import ProducersAdmin from '@/components/admin/ProducersAdmin';
import { getClassesData } from '../lib/classActions';

export default async function AdminPage() {
  const classData = await getClassesData();
  return (
    <div className="h-screen flex flex-row">
      <div className="w-1/2">
        <ClassesAdmin classData={classData} />
      </div>
      <div className="w-1/2">
        <ProducersAdmin />
      </div>
    </div>
  );
}
