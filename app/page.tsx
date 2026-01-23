import App from '@/components/App';
import { getOptionsData } from '@/app/lib/optionsActions';
import { getEventsData } from './lib/eventActions';

export default async function Page() {
  const optionsData = await getOptionsData();
  const eventsData = await getEventsData();

  return <App eventOptions={optionsData} eventsData={eventsData} />;
}
