import type { ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <main className="page-shell">{children}</main>
);

export default DashboardLayout;
