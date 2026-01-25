import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { handleEventCreate } from '@/app/lib/eventActions';
import { useSidebar } from '@/stores/useSidebar';
import { EventOptionsType } from '@/types';
import { SquareCheck } from 'lucide-react';
import { PanelRightClose } from 'lucide-react';
import { useState } from 'react';

type CreateSidebarProps = {
  eventOptions: EventOptionsType;
};

export function CreateDialog({ eventOptions }: CreateSidebarProps) {
  const isDialogOpen = useSidebar((state) => state.isDialogOpen);
  const setIsDialogOpen = useSidebar((state) => state.setIsDialogOpen);
  const selectedDate = useSidebar((state) => state.selectedDate);
  const setMode = useSidebar((state) => state.setMode);
  const setSelectedDate = useSidebar((state) => state.setSelectedDate);
  const unavailableTimes = useSidebar((state) => state.unavailableTimes);
  const setUnavailableTimes = useSidebar((state) => state.setUnavailableTimes);

  if (!eventOptions) return <div>Loading...</div>;

  const { classNames, producers, times } = eventOptions;

  // client function receieving server response
  async function handleSubmit(formData: FormData) {
    const result = await handleEventCreate(formData);

    if (result.success) {
      setIsDialogOpen(false);
      setMode(null);
      setUnavailableTimes(null);
    } else {
      console.error('Form submmission failed', result.error);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      
        <DialogContent className="sm:max-w-150">
          <form action={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-center">
              {selectedDate?.toLocaleString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </DialogTitle>
          </DialogHeader>
          <input
            type="hidden"
            name="date"
            id="date"
            value={selectedDate?.toISOString().split('T')[0] ?? ""}
          />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class_id">Class</Label>
            <Select name="class_id">
              <SelectTrigger id="class_id" className="w-45">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classNames.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="producer_id">Producer</Label>
            <Select name="producer_id">
              <SelectTrigger  id="producer_id" className="w-45">
                <SelectValue placeholder="Select producer" />
              </SelectTrigger>
              <SelectContent>
                {producers?.map((item) => (
                  <SelectItem key={item.id} value={item.id.toString()}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time_id">Time</Label>
            <Select name="time_id" >

              <SelectTrigger id="time_id" className="w-45">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>

              <SelectContent>
                {times?.map((time) => {
                const isUnavailable = unavailableTimes?.some(
                  (un) => un.time_id === time.id,
                );

                return (
                  <SelectItem
                    key={time.id}
                    value={time.id.toString()}
                    disabled={isUnavailable}
                  >
                    {time.name}
                  </SelectItem>
                );
              })}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="topic">Topic</Label>
            <Textarea name="topic" id="topic" className="col-span-3" />
          </div>

          <DialogFooter className="flex bg-green-400">
            <button type="submit">
              <SquareCheck color="green" size={50} strokeWidth={2} />
            </button>

            <DialogClose asChild>
              <button
              type="button"
                onClick={() => {
                  setMode(null);
                  setSelectedDate(null);
                  setUnavailableTimes(null);
                }}
              >
                <PanelRightClose color="gray" size={50} strokeWidth={2} />
              </button>
            </DialogClose>
          </DialogFooter>
             </form>
        </DialogContent>
   
    </Dialog>
  );
}
