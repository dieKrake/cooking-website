import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaButtonProps extends VariantProps<typeof buttonVariants> {
  href: string;
  label: string;
  className?: string;
}

export function CtaButton({
  href,
  label,
  variant = "default",
  size = "lg",
  className,
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {label}
    </Link>
  );
}
