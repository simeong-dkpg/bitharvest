import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:!bg-green-900/80 group-[.toaster]:!border-green-500/50 group-[.toaster]:!text-green-100",
          error: "group-[.toaster]:!bg-red-900/80 group-[.toaster]:!border-red-500/50 group-[.toaster]:!text-red-100",
          warning: "group-[.toaster]:!bg-amber-900/80 group-[.toaster]:!border-amber-500/50 group-[.toaster]:!text-amber-100",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
