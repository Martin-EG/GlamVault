'use client';

import BottomNavigation from '@/features/BottomNavigation';
import DashboardHeader from '@/features/dashboard/DashboardHeader';
import Sidebar from '@/features/Sidebar';
import { FC, ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex min-h-dvh flex-col">
        <DashboardHeader />
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <main className="flex-1 min-h-0 overflow-auto py-5 px-10 pb-10 md:pb-5 bg-gray-100">
            {children}
          </main>
        </div>

        <BottomNavigation />
      </div>
    </>
  );
};

export default DashboardLayout;
