import { ToDos } from './Components/ToDos';
import { Footer } from './Components/Footer';
import ThemeToggleButton from './Components/ThemeToggleButton';
import { useTheme } from './ThemeContext';

function App() {
  const { isDarkMode } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col relative transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-black text-white dark' 
        : 'text-white bg-stone-900 '
    }`}>
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggleButton />
      </div>
      <main className="flex-1 flex items-center justify-center px-4">
        <ToDos />
      </main>
      <Footer />
    </div>
  );
}

export default App;