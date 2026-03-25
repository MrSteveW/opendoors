import { getClassesData } from '@/lib/classActions';
import { getProducersData } from '@/lib/producerActions';
import { getTimesData } from '@/lib/timesActions';
import { getIconsData } from '@/lib/iconsActions';
import AdminPanel from '@/components/admin/AdminPanel';

export default async function AdminPage() {
  const classData = await getClassesData();
  const producersData = await getProducersData();
  const timesData = await getTimesData();
  const iconsData = await getIconsData();

  return (
    <div className="w-full p-4">
      <AdminPanel
        classData={classData}
        producersData={producersData}
        timesData={timesData}
        iconsData={iconsData}
      />
    </div>
  );
}
