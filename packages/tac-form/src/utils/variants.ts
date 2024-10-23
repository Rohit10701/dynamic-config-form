import { cva } from 'class-variance-authority';

export const formElementVariants = cva(
  "inline-flex items-center justify-center  dark:accent-gray-700 gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border border-input shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:accent-gray-700", // Dark mode styles
        destructive:
          "bg-background text-foreground shadow-sm border border-destructive focus-visible:ring-destructive dark:bg-gray-800 dark:text-white dark:border-red-500 dark:accent-gray-700 dark:border-1", // Dark mode styles
        outline: "border border-input bg-background shadow-sm hover:bg-foreground hover:text-accent-foreground dark:bg-gray-800 dark:text-gray-200 dark:accent-gray-700", // Dark mode styles
        secondary: "bg-background text-foreground border border-secondary shadow-sm dark:bg-gray-700 dark:text-gray-300 dark:accent-gray-700", // Dark mode styles
        ghost: "bg-transparent dark:bg-transparent dark:accent-gray-700",
      },
      size: {
        default: "h-10 w-full px-4 py-2",
        sm: "h-8 w-full px-3 text-xs",
        lg: "h-12 w-full px-6 text-lg",
        none: "",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: false,
    },
  }
);
