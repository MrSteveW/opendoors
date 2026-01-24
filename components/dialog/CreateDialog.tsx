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

export function CreateDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Button trigger</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-150">
          <DialogHeader>
            <DialogTitle className="text-center">DATE OF BOOKING</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name-1" name="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="CLASSSOMETHING">Class</Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Class1">Class1</SelectItem>
                <SelectItem value="Class2">Class2</SelectItem>
                <SelectItem value="Class3">Class3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="PRODUCERSOMETHING">Producer</Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Class1">Producer1</SelectItem>
                <SelectItem value="Class2">Producer2</SelectItem>
                <SelectItem value="Class3">Producer3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="TIMEOMETHING">Time</Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Class1">Time1</SelectItem>
                <SelectItem value="Class2">Time2</SelectItem>
                <SelectItem value="Class3">Time3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="TIMEOMETHING">Topic</Label>
            <Textarea className="col-span-3" />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
