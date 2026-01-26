import { ItemData } from '@/types';
import { DeleteButton } from '../DeleteButton';

type ItemCardProps = {
  item: ItemData;
  handleDelete: (id: number) => void;
};

export default function ItemCard({ item, handleDelete }: ItemCardProps) {
  return (
    <div className="w-60 flex flex-row p-2 m-2 text-xl justify-between border-openblue border-3 rounded-lg">
      <div>{item.name}</div>
      <div className="flex enlarge-button">
        <DeleteButton
          handleDelete={handleDelete}
          id={Number(item.id)}
          size={25}
        />
      </div>
    </div>
  );
}
