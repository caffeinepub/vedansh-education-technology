import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import BottomNavBar from './BottomNavBar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
}
