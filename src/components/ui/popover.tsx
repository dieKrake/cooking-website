"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Positioner>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Positioner>
>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner ref={ref} sideOffset={8} {...props}>
      <PopoverPrimitive.Popup
        className={cn(
          "z-50 w-72 rounded-xl border border-border bg-background p-4 text-foreground shadow-md outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
      >
        {children}
      </PopoverPrimitive.Popup>
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Positioner.displayName;

export { Popover, PopoverTrigger, PopoverContent };
