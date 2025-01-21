import { useIsMobile } from "@/hooks/use-is-mobile"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: ((open: boolean) => void) | undefined;
  title: string;
  visuallyHidden?: boolean;
  className?: string;
}

export function ResponsiveModal({ children, onOpenChange, open, title, visuallyHidden, className }: ResponsiveModalProps) {

  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className={cn(
          "p-4",
          className
        )}>
          {visuallyHidden ? (
            <VisuallyHidden>
              <DrawerTitle>{title}</DrawerTitle>
            </VisuallyHidden>
          ) : (
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
            </DrawerHeader>
          )}
          {children}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(className)}>
        {visuallyHidden ? (
          <VisuallyHidden>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden>
        ) : (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  )
}
