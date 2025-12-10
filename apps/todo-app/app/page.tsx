"use client";

import { ToDos } from '../src/components/ToDos';
import { Footer } from '../src/components/Footer';
import ThemeToggleButton from '../src/components/ThemeToggleButton';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col relative bg-black text-white">
            <div className="absolute top-4 right-4 z-10">
                <ThemeToggleButton />
            </div>
            <main className="flex-1 flex items-center justify-center px-4">
                <ToDos />
            </main>
            <Footer />
        </div>
    );
};