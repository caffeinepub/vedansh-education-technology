import { Outlet } from "@tanstack/react-router";
import BottomNavBar from "./BottomNavBar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
}
