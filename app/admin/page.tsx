import { getClassesData } from '@/lib/classActions';
import { getProducersData } from '@/lib/producerActions';
import { getTimesData } from '@/lib/timesActions';
import { getIconsData } from '@/lib/iconsActions';
import { getProducerEventCounts } from '@/lib/statsActions';
import { getClassEventCount } from '@/lib/statsActions';
import AdminPanel from '@/components/admin/AdminPanel';

export default async function AdminPage() {
  const classData = await getClassesData();
  const producersData = await getProducersData();
  const timesData = await getTimesData();
  const iconsData = await getIconsData();
  const producersCount = await getProducerEventCounts();
  const classEventsCount = await getClassEventCount();

  return (
    <div className="w-full p-4">
      <AdminPanel
        classData={classData}
        producersData={producersData}
        timesData={timesData}
        iconsData={iconsData}
        producersCount={producersCount}
        classEventsCount={classEventsCount}
      />
    </div>
  );
}
