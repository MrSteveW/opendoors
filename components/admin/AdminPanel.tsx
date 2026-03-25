'use client';
import ClassesAdmin from '@/components/admin/ClassesAdmin';
import ProducersAdmin from '@/components/admin/ProducersAdmin';
import TimesAdmin from '@/components/admin/TimesAdmin';
import { useAdminPanel } from '@/stores/useAdminPanel';
import { ClassItem } from '@/types';
import { ProducerItem } from '@/types';
import { TimesItem } from '@/types';
import { IconsItem } from '@/types';

type AdminPanelProps = {
  classData: ClassItem[];
  producersData: ProducerItem[];
  timesData: TimesItem[];
  iconsData: IconsItem[];
};

export default function AdminPanel({
  classData,
  producersData,
  timesData,
  iconsData,
}: AdminPanelProps) {
  const adminMode = useAdminPanel((state) => state.adminMode);

  return (
    <div>
      <div>
        {adminMode === 'Classes' && <ClassesAdmin classData={classData} />}
        {adminMode === 'Producers' && (
          <ProducersAdmin producersData={producersData} />
        )}
        {adminMode === 'Times' && (
          <TimesAdmin timesData={timesData} iconsData={iconsData} />
        )}
      </div>
    </div>
  );
}
