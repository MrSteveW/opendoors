import * as Icons from 'lucide-react';
import { Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IconsItem } from '@/types';

interface DialogProps {
  iconsData: IconsItem[];
  selectIcon: (icon: string) => void;
}

export default function IconDialog({ iconsData, selectIcon }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Select Icon</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Select icon</DialogTitle>
        </DialogHeader>
        <DialogClose asChild>
          <div className="w-full flex flex-wrap">
            {iconsData.map((icon) => {
              const IconComponent =
                (Icons[icon.name as keyof typeof Icons] as React.ElementType) ??
                Music;
              return (
                <div
                  className="m-1.5"
                  key={icon.name}
                  onClick={() => selectIcon(icon.name)}
                >
                  <IconComponent size={40} />
                </div>
              );
            })}
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
