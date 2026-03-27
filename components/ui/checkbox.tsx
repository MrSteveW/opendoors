'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'grid place-content-center peer shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        success:
          'border-primary data-[state=checked]:bg-green-500 data-[state=checked]:text-white',
        danger:
          'border-red-500 data-[state=checked]:bg-red-500 data-[state=checked]:text-white',
        warning:
          'border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white',
        outline:
          'border-2 border-primary data-[state=checked]:bg-transparent data-[state=checked]:text-primary',
      },
      size: {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-6 w-6',
        xl: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const iconSizeMap: Record<string, string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
};

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> &
  VariantProps<typeof checkboxVariants>;

function Checkbox({ className, variant, size, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(checkboxVariants({ variant, size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid place-content-center text-current">
        <Check className={iconSizeMap[size ?? 'md']} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
