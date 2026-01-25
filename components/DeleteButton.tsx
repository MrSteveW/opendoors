import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DeleteyButtonProps {
  handleDelete: (id: number) => void;
  id: number | undefined;
  size: number;
}

export function DeleteButton({ handleDelete, id, size }: DeleteyButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer outline-none">
          <Trash color="red" size={size} strokeWidth={2} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
          <DialogDescription>
            Are you sure you wish to delete?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center flex-row justify-center space-x-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => id && handleDelete(id)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
