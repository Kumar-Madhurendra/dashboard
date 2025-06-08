import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none border-2 border-indigo-500"
      style={{
        backgroundColor: theme === 'dark' ? '#4F46E5' : '#E5E7EB',
      }}
    >
      <motion.span
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg"
        animate={{
          x: theme === 'dark' ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggle; 