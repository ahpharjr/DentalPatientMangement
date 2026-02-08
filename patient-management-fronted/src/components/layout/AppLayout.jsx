import Sidebar from "./SideBar";
import Topbar from "./Topbar";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-black text-zinc-200">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
