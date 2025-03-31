"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useGetAuthUserQuery } from "@/state/api";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data: authUser, isLoading: isAuthLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenant" && pathname.startsWith("/managers"))
      ) {
        const redirectPath =
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites";
        router.push(redirectPath, { scroll: false });
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname]);

  if (isAuthLoading || isLoading) return <Loading />;
  if (!authUser?.userRole) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-primary-100">
        <Navbar />
        <div style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex">
            <AppSidebar userType={authUser.userRole?.toLowerCase()} />
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
