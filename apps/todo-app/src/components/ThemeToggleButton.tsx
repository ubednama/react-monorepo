"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from "@repo/ui";


const ThemeToggleButton = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className='justify-self-end p-8'>
            <Button
                variant="ghost"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className='rounded text-white bg-transparent hover:bg-transparent hover:text-white'>
                {resolvedTheme === 'dark' ? <Sun className='size-8 sm:size-10' /> : <Moon className='size-8 sm:size-10' />}
            </Button>
        </div>
    );
};

export default ThemeToggleButton;
