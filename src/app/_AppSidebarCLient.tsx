"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSideBarCLient({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <div className="p-2 border-b flex items-center gap-1">
          <SidebarTrigger />
          <span className="text-xl text-nowrap">WDS jobs</span>
        </div>
        <div className="flex-1 flex">{children}</div>
      </div>
    );
  }
  return children;
}
