import { useState, useRef } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ChartsPage = () => {
  const [selectedDataset, setSelectedDataset] = useState('sales');
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const areaChartRef = useRef(null);

  // Sample data - in a real app, this would come from an API
  const data = {
    sales: [
      { month: 'Jan', value: 4000 },
      { month: 'Feb', value: 3000 },
      { month: 'Mar', value: 2000 },
      { month: 'Apr', value: 2780 },
      { month: 'May', value: 1890 },
      { month: 'Jun', value: 2390 },
    ],
    traffic: [
      { month: 'Jan', value: 2400 },
      { month: 'Feb', value: 1398 },
      { month: 'Mar', value: 9800 },
      { month: 'Apr', value: 3908 },
      { month: 'May', value: 4800 },
      { month: 'Jun', value: 3800 },
    ],
    users: [
      { month: 'Jan', value: 1000 },
      { month: 'Feb', value: 2000 },
      { month: 'Mar', value: 3000 },
      { month: 'Apr', value: 4000 },
      { month: 'May', value: 5000 },
      { month: 'Jun', value: 6000 },
    ],
  };

  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Charts</h1>
        <select
          value={selectedDataset}
          onChange={(e) => setSelectedDataset(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="sales">Sales Data</option>
          <option value="traffic">Traffic Data</option>
          <option value="users">User Data</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div ref={lineChartRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 onClick={() => lineChartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="text-lg font-semibold mb-4 text-gray-900 dark:text-white cursor-pointer">Line Chart</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data[selectedDataset]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div ref={barChartRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 onClick={() => barChartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="text-lg font-semibold mb-4 text-gray-900 dark:text-white cursor-pointer">Bar Chart</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data[selectedDataset]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div ref={pieChartRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 onClick={() => pieChartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="text-lg font-semibold mb-4 text-gray-900 dark:text-white cursor-pointer">Pie Chart</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div ref={areaChartRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 onClick={() => areaChartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="text-lg font-semibold mb-4 text-gray-900 dark:text-white cursor-pointer">Area Chart</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data[selectedDataset]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage; 