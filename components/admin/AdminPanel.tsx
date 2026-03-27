'use client';
import ClassesAdmin from '@/components/admin/ClassesAdmin';
import ProducersAdmin from '@/components/admin/ProducersAdmin';
import TimesAdmin from '@/components/admin/TimesAdmin';
import StatsAdmin from './StatsAdmin';
import { useAdminPanel } from '@/stores/useAdminPanel';
import {
  ClassItem,
  ProducerItem,
  TimesItem,
  IconsItem,
  StatsCount,
} from '@/types';
type AdminPanelProps = {
  classData: ClassItem[];
  producersData: ProducerItem[];
  timesData: TimesItem[];
  iconsData: IconsItem[];
  producersCount: StatsCount[];
  classEventsCount: StatsCount[];
};

export default function AdminPanel({
  classData,
  producersData,
  timesData,
  iconsData,
  producersCount,
  classEventsCount,
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
        {adminMode === 'Stats' && (
          <StatsAdmin
            producersCount={producersCount}
            classEventsCount={classEventsCount}
          />
        )}
      </div>
    </div>
  );
}
