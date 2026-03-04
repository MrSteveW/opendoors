import AppComponent from '@/components/App';
import { getOptionsData } from '@/lib/optionsActions';
import { getEventsData } from '@/lib/eventActions';

export default async function App() {
  const optionsData = await getOptionsData();
  const eventsData = await getEventsData();

  return <AppComponent eventOptions={optionsData} eventsData={eventsData} />;
}
