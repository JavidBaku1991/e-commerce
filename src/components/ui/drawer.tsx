import * as React from "react";

interface DrawerContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const DrawerContext = React.createContext<DrawerContextType | undefined>(undefined);

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function Drawer({ children, open, onOpenChange }: DrawerProps) {
  return (
    <DrawerContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DrawerContext.Provider>
  );
}

interface DrawerTriggerProps {
  children: React.ReactNode;
}
export function DrawerTrigger({ children }: DrawerTriggerProps) {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) return null;
  return (
    <span onClick={() => ctx.onOpenChange(true)} className="cursor-pointer">
      {children}
    </span>
  );
}

interface DrawerContentProps {
  children: React.ReactNode;
}
export function DrawerContent({ children }: DrawerContentProps) {
  const ctx = React.useContext(DrawerContext);
  if (!ctx || !ctx.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={() => ctx.onOpenChange(false)}
      />

      {/* Drawer panel */}
      <div className="ml-auto w-64 bg-white h-full shadow-lg p-4 relative z-10">
        {children}
      </div>
    </div>
  );
}

interface DrawerHeaderProps {
  children: React.ReactNode;
}
export function DrawerHeader({ children }: DrawerHeaderProps) {
  return <div className="border-b pb-2 mb-2">{children}</div>;
}

interface DrawerCloseProps {
  children: React.ReactNode;
  asChild?: boolean;
}
export function DrawerClose({ children, asChild }: DrawerCloseProps) {
  const ctx = React.useContext(DrawerContext);
  if (!ctx) return null;

  if (asChild && React.isValidElement(children)) {
    const childEl = children as React.ReactElement<any>;
    const handleClick = (e: any) => {
      if (typeof childEl.props.onClick === "function") {
        childEl.props.onClick(e);
      }
      setTimeout(() => ctx.onOpenChange(false), 0);
    };
    return React.cloneElement(childEl, {
      onClick: handleClick,
    });
  }

  return (
    <span onClick={() => ctx.onOpenChange(false)} className="cursor-pointer">
      {children}
    </span>
  );
}
