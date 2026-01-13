import DeleteButton from "./DeleteButton";

type Item = {
  id: number;
  name: string;
};

interface ItemCardProps {
  item: Item;
  handleDelete: (id: number) => void;
}

export default function ItemCard({ item, handleDelete }: ItemCardProps) {
  return (
    <div className="w-100 flex flex-row bg-white p-2 m-2 text-2xl justify-between border-openblue border-3 rounded-lg">
      <div>{item.name}</div>
      <div className="flex ">
        <DeleteButton id={item.id} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
