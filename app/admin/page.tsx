import ClassesAdmin from '@/components/admin/ClassesAdmin';
import ProducersAdmin from '@/components/admin/ProducersAdmin';
import { getClassesData } from '../lib/classActions';
import { getProducersData } from '../lib/producerActions';

export default async function AdminPage() {
  const classData = await getClassesData();
  const producersData = await getProducersData();

  return (
    <div className="h-screen flex flex-row">
      <div className="w-1/2">
        <ClassesAdmin classData={classData} />
      </div>
      <div className="w-1/2">
        <ProducersAdmin producersData={producersData} />
      </div>
    </div>
  );
}
