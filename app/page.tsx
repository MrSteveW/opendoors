import App from '@/components/App';
import { getOptionsData } from '@/app/lib/data';

export default async function Page() {
  const optionsData = await getOptionsData();
  return <App eventOptions={optionsData} />;
}
