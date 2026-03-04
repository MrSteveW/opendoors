import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { handleEventCreate } from '@/lib/eventActions';
import { handleEventEdit } from '@/lib/eventActions';
import { handleEventDelete } from '@/lib/eventActions';
import { useEventDialog } from '@/stores/useEventDialog';
import { EventOptionsType } from '@/types';
import { SquareCheck } from 'lucide-react';
import { PanelRightClose } from 'lucide-react';
import { DeleteButton } from './DeleteButton';
import { useRouter } from 'next/navigation';

type EventDialogProps = {
  eventOptions: EventOptionsType;
};

export function EventDialog({ eventOptions }: EventDialogProps) {
  const router = useRouter();
  const isDialogOpen = useEventDialog((state) => state.isDialogOpen);
  const setIsDialogOpen = useEventDialog((state) => state.setIsDialogOpen);
  const selectedDate = useEventDialog((state) => state.selectedDate);
  const setSelectedDate = useEventDialog((state) => state.setSelectedDate);
  const unavailableTimes = useEventDialog((state) => state.unavailableTimes);
  const setUnavailableTimes = useEventDialog(
    (state) => state.setUnavailableTimes,
  );
  const selectedEvent = useEventDialog((state) => state.selectedEvent);
  const setSelectedEvent = useEventDialog((state) => state.setSelectedEvent);
  const isReadOnly = useEventDialog((state) => state.isReadOnly);
  const formAction = selectedEvent ? handleEditSubmit : handleSubmit;

  if (!eventOptions) return <div>Loading...</div>;

  const { classNames, producers, times } = eventOptions;

  // client function receieving server response
  async function handleSubmit(formData: FormData) {
    const result = await handleEventCreate(formData);

    if (result.success) {
      setIsDialogOpen(false);
      setUnavailableTimes(null);
    } else {
      console.error('Form submmission failed', result.error);
    }
  }

  async function handleEditSubmit(formData: FormData) {
    const result = await handleEventEdit(formData);

    if (result.success) {
      setIsDialogOpen(false);
      router.refresh();
    } else {
      console.error('Update failed', result.error);
    }
  }

  async function handleDelete(id: number) {
    const result = await handleEventDelete(id);
    if (result.success) {
      setIsDialogOpen(false);
      router.refresh();
      setSelectedEvent(null);
    } else {
      console.error('Update failed', result.error);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-150">
        <form
          key={selectedEvent?.id || selectedDate?.toISOString()}
          action={formAction}
          className="flex flex-col space-y-8 text-3xl"
        >
          <DialogHeader>
            <DialogTitle className="text-center">
              {(selectedEvent?.start || selectedDate)?.toLocaleString('en-GB', {
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
            value={
              selectedDate?.toISOString().split('T')[0] ??
              (selectedEvent?.start
                ? new Date(selectedEvent.start).toISOString().split('T')[0]
                : '')
            }
          />
          {selectedEvent && (
            <input type="hidden" name="id" value={selectedEvent.id} />
          )}

          {/* NAME */}
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="name" className="text-2xl">
              Name
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                name="name"
                autoComplete="off"
                required
                className="text-2xl"
                defaultValue={selectedEvent?.title}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          {/* CLASS */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class_id" className="text-2xl">
              Class
            </Label>
            <div className="col-span-3">
              <Select
                name="class_id"
                defaultValue={selectedEvent?.extendedProps.class_id?.toString()}
                disabled={isReadOnly}
                required={true}
              >
                <SelectTrigger id="class_id" className="text-2xl">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classNames.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id.toString()}
                      className="text-2xl"
                    >
                      <div className="grid grid-cols-[4fr_1fr] items-center w-full ">
                        <div className="truncate">{item.name}</div>
                        <div className="text-slate-500">
                          ({item.year_group})
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* PRODCUER */}
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="producer_id" className="text-2xl">
              Producer
            </Label>
            <div className="col-span-3">
              <Select
                name="producer_id"
                defaultValue={selectedEvent?.extendedProps.producer_id?.toString()}
                disabled={isReadOnly}
                required={true}
              >
                <SelectTrigger id="producer_id" className="text-2xl">
                  <SelectValue placeholder="Select producer" />
                </SelectTrigger>
                <SelectContent>
                  {producers?.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id.toString()}
                      className="text-2xl"
                    >
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* TIME */}
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="time_id" className="text-2xl">
              Time
            </Label>
            <div className="col-span-3">
              <Select
                name="time_id"
                defaultValue={selectedEvent?.extendedProps.time_id?.toString()}
                disabled={isReadOnly}
                required={true}
              >
                <SelectTrigger id="time_id" className="text-2xl">
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
                        className="text-2xl"
                      >
                        {time.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* TOPIC */}
          <div className="grid grid-cols-4 items-center">
            <Label htmlFor="topic" className="text-2xl self-start pt-2">
              Topic
            </Label>
            <div className="col-span-3">
              <Textarea
                name="topic"
                id="topic"
                className="w-full text-2xl"
                defaultValue={selectedEvent?.extendedProps.topic}
                readOnly={isReadOnly}
              />
            </div>
          </div>

          <DialogFooter>
            {!isReadOnly && (
              <>
                <button type="submit" className="enlarge-button">
                  <SquareCheck color="green" size={50} strokeWidth={2} />
                </button>

                {selectedEvent && (
                  <div className="enlarge-button">
                    <DeleteButton
                      handleDelete={handleDelete}
                      id={Number(selectedEvent?.id)}
                      size={50}
                    />
                  </div>
                )}
              </>
            )}

            <DialogClose asChild>
              <button
                type="button"
                className="enlarge-button"
                onClick={() => {
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
