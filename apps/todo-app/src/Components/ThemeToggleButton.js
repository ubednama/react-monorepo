import React from 'react';
import { useTheme } from '../ThemeContext';
import { Moon, Sun } from 'lucide-react';


const ThemeToggleButton = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div className='justify-self-end p-8'>
            <button
                onClick={toggleDarkMode}
                className=' rounded text-white'>
                {isDarkMode ? <Sun className='size-8 sm:size-10' /> : <Moon className='size-8 sm:size-10' />}
            </button>
        </div>
    );
};

export default ThemeToggleButton;
