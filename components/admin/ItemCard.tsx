import { ItemData } from '@/types';
import { DeleteButton } from '../DeleteButton';

type ItemCardProps = {
  item: ItemData;
  handleDelete: (id: number) => void;
};

export default function ItemCard({ item, handleDelete }: ItemCardProps) {
  return (
    <div className="w-45 flex flex-row bg-white p-1 mx-2 my-1 text-lg justify-between border-openblue border-3 rounded-lg">
      <div>{item.name}</div>
      <div className="flex ">
        <DeleteButton
          handleDelete={handleDelete}
          id={Number(item.id)}
          size={25}
        />
      </div>
    </div>
  );
}
