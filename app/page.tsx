import AppComponent from '@/components/App';
import { getOptionsData } from '@/lib/optionsActions';

export default async function App() {
  const optionsData = await getOptionsData();

  return <AppComponent eventOptions={optionsData} />;
}
