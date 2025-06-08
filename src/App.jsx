import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import ChartsPage from './pages/ChartsPage';
import DataTablePage from './pages/DataTablePage';
import KanbanBoard from './pages/KanbanBoard';
import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans transition-colors duration-200">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-6">
          <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">AdminDash</Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="space-x-2">
              <button className="px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Login</button>
              <button className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Get Started</button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <section className="flex flex-col items-center justify-center flex-1 text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">Powerful Admin Dashboard<br />for Your Business</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-xl mb-8">Manage your data with interactive charts, dynamic tables, Kanban boards, and more – all in one place.</p>
                <button className="px-6 py-3 rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">Get Started</button>
              </section>
            } />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/table" element={<DataTablePage />} />
            <Route path="/kanban" element={<KanbanBoard />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </main>

        {/* Features Section */}
        <section className="bg-white dark:bg-gray-800 w-full py-12 px-4 transition-colors">
          <h2 className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-white">Features</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 - Interactive Charts */}
            <Link to="/charts" className="flex items-start space-x-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 flex items-center justify-center transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Interactive Charts</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Visualize your data with customizable charts.</div>
              </div>
            </Link>

            {/* Feature 2 - Dynamic Tables */}
            <Link to="/table" className="flex items-start space-x-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 flex items-center justify-center transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Dynamic Tables</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">View and manage data in flexible tables.</div>
              </div>
            </Link>

            {/* Feature 3 - Kanban Boards */}
            <Link to="/kanban" className="flex items-start space-x-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 flex items-center justify-center transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"><rect x="3" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Kanban Boards</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Organize tasks with a drag-and-drop Kanban board</div>
              </div>
            </Link>

            {/* Feature 4 */}
            <Link to="/calendar" className="flex items-start space-x-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors">
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 flex items-center justify-center transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Calendar</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Manage events or tasks by date</div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default App;
