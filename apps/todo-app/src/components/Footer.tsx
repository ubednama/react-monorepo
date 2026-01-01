import { Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className='bg-stone-900 dark:bg-black text-white py-2 px-2'>
      <div className='flex items-center justify-between'>
        <div className='text-xs'>
          Copyright &copy; Todo App
        </div>
        <div className='flex items-center text-sm absolute left-1/2 transform -translate-x-1/2'>
          Made with ❤️ by
          <a
            href="https://github.com/ubednama"
            className='underline flex items-center gap-x-1 ml-2 hover:text-orange-400 transition-colors'
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} />
            ubednama
          </a>
        </div>
      </div>
    </footer>
  );
}