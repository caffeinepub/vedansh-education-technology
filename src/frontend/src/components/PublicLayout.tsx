import { Outlet } from "@tanstack/react-router";
import Footer from "./Footer";
import Header from "./Header";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
