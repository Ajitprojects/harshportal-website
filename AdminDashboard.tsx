import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';

// --- DATA STRUCTURES ---
interface Product { id: number; name: string; }
interface User { id: number; name: string; }
interface Order { id: number; customer: string; total: string; date: string; }
// Define the type for our chart data
interface ChartDataPoint {
  name: string;
  sales: number;
}

// --- MOCK API ---
const fetchDashboardData = (): Promise<{ users: User[], products: Product[], orders: Order[] }> => {
  const users: User[] = [{ id: 1, name: "Harsh" }, { id: 2, name: "Sonal" }, { id: 3, name: "Jay" }, { id: 4, name: "Priya" }];
  const products: Product[] = [{ id: 1, name: "Netflix" }, { id: 2, name: "Spotify" }, { id: 3, name: "YouTube" }];
  const orders: Order[] = [
    { id: 101, customer: "Alice", total: "$89.99", date: "2025-07-15" },
    { id: 102, customer: "Bob", total: "$29.99", date: "2025-07-16" },
    { id: 103, customer: "Charlie", total: "$59.99", date: "2025-07-12" },
    { id: 104, customer: "Diana", total: "$129.50", date: "2025-07-14" },
  ];
  return new Promise(resolve => setTimeout(() => resolve({ users, products, orders }), 1000));
};

// --- MAIN DASHBOARD COMPONENT ---
export default function AdminDashboard() {
  const [stats, setStats] = useState({ userCount: 0, productCount: 0, orderCount: 0, revenue: 0 });
  // Explicitly type the chartData state
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const { users, products, orders } = await fetchDashboardData();

        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total.replace('$', '')), 0);
        setStats({
          userCount: users.length,
          productCount: products.length,
          orderCount: orders.length,
          revenue: totalRevenue,
        });

        const salesByDay = orders.reduce((acc, order) => {
            const day = new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const amount = parseFloat(order.total.replace('$', ''));
            acc[day] = (acc[day] || 0) + amount;
            return acc;
        }, {} as Record<string, number>);

        const formattedChartData: ChartDataPoint[] = Object.entries(salesByDay).map(([name, sales]) => ({ name, sales }));
        setChartData(formattedChartData);
        
      } catch (error) {
        toast.error("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  
  const statCards = [
    { label: "Total Users", value: stats.userCount },
    { label: "Total Products", value: stats.productCount },
    { label: "Total Orders", value: stats.orderCount },
    { label: "Total Revenue", value: `$${stats.revenue.toFixed(2)}` },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <motion.h1 
        className="text-4xl font-extrabold text-white drop-shadow-[0_0_10px_#00ffff] font-display"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="bg-black/30 border border-purple-700/30 shadow-lg hover:shadow-[0_0_15px_4px_rgba(168,85,247,0.4)] transition-shadow">
              <CardContent className="p-4 text-center space-y-1">
                <p className="text-sm uppercase text-purple-300 font-mono">{stat.label}</p>
                {isLoading ? (
                  <div className="h-9 w-24 mx-auto mt-1 bg-purple-900/50 rounded animate-pulse"></div>
                ) : (
                  <h2 className="text-3xl font-bold text-cyan-300 font-cyber">{stat.value}</h2>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="bg-black/30 p-6 rounded-xl shadow-lg border border-purple-700/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4 font-display text-cyan-300">Recent Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          {isLoading ? (
            <div className="w-full h-full bg-purple-900/20 rounded animate-pulse"></div>
          ) : (
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#4c1d95" />
              <XAxis dataKey="name" stroke="#a78bfa" fontSize={12} />
              <YAxis stroke="#a78bfa" fontSize={12} />
              <Tooltip
                cursor={{ fill: 'rgba(167, 139, 250, 0.1)' }}
                contentStyle={{
                  backgroundColor: 'rgba(20, 1, 44, 0.9)',
                  borderColor: '#a855f7',
                  color: '#ffffff',
                }}
              />
              <Bar dataKey="sales" name="Sales ($)" fill="url(#colorSales)" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}