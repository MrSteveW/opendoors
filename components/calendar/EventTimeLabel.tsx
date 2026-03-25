import { useCallback } from 'react';
import * as Icons from 'lucide-react';
import { Music } from 'lucide-react';
import { getEventTimeColor } from '@/lib/eventTimeColours';

type PropsType = {
  time: string;
  icon: string;
  order: number;
};

export default function EventTimeLabel({ time, icon, order }: PropsType) {
  const textColor = getEventTimeColor(order);

  const renderContent = useCallback(() => {
    const IconComponent =
      (Icons[icon as keyof typeof Icons] as React.ElementType) ?? Music;

    return (
      <div className={`${textColor} flex font-bold items-center`}>
        <div>
          <IconComponent />
        </div>
        <div className="ml-1">{time}</div>
        <div></div>
      </div>
    );
  }, [time, icon, textColor]);

  return <div>{renderContent()}</div>;
}
