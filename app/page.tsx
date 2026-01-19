import App from '@/components/App';
import { getOptionsData } from '@/app/lib/getOptionsData';

export default async function Page() {
  const optionsData = await getOptionsData();
  return <App eventOptions={optionsData} />;
}
