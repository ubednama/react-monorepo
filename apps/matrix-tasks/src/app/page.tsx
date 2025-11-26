import Navbar from "@/components/shared/Navbar";
import TaskBoard from "@/components/TaskBoard/TaskBoard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-slate-950 dark:to-black text-gray-800 dark:text-gray-100 h-screen flex flex-col transition-all duration-300 ease-out">
      <Navbar />
      <div className="flex-1 relative" style={{ overflow: 'visible' }}>
        {/* Enhanced background pattern */}
        <div
          className={`absolute inset-0 ${styles.backgroundPattern} dark:${styles.backgroundPatternDark}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-purple-500/5 dark:from-transparent dark:via-blue-500/10 dark:to-purple-500/10" />
          {/* Animated background elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 dark:bg-blue-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 dark:bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500/10 dark:bg-green-400/20 rounded-full blur-xl animate-pulse delay-2000" />
        </div>
        <TaskBoard />
      </div>
    </main>
  );
}
