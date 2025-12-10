import Navbar from "@/components/shared/Navbar";
import TaskBoard from "@/components/TaskBoard/TaskBoard";

export default function Home() {
  return (
    <main className="bg-slate-50 dark:bg-black text-zinc-900 dark:text-zinc-100 h-screen flex flex-col transition-all duration-300 ease-out">
      <Navbar />
      <div className="flex-1 relative" style={{ overflow: 'hidden' }}>
        {/* Enhanced background pattern */}
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-size-[16px_16px]" />

        {/* Subtle center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <TaskBoard />
      </div>
    </main>
  );
}
