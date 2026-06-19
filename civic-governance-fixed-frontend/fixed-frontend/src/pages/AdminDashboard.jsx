import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/complaints/statistics');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  const pieData = {
    labels: ['Submitted', 'Assigned', 'In Progress', 'Resolved', 'Escalated'],
    datasets: [{
      data: [
        stats.submitted,
        stats.assigned,
        stats.inProgress,
        stats.resolved,
        stats.escalated
      ],
      backgroundColor: [
        '#3b82f6',
        '#fbbf24',
        '#8b5cf6',
        '#10b981',
        '#ef4444'
      ]
    }]
  };

  const barData = {
    labels: ['Submitted', 'Assigned', 'In Progress', 'Resolved', 'Escalated'],
    datasets: [{
      label: 'Number of Complaints',
      data: [
        stats.submitted,
        stats.assigned,
        stats.inProgress,
        stats.resolved,
        stats.escalated
      ],
      backgroundColor: '#3b82f6'
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="card bg-blue-500 text-white">
            <h3 className="text-sm font-medium">Total</h3>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="card bg-yellow-500 text-white">
            <h3 className="text-sm font-medium">Submitted</h3>
            <p className="text-3xl font-bold">{stats.submitted}</p>
          </div>
          <div className="card bg-orange-500 text-white">
            <h3 className="text-sm font-medium">Assigned</h3>
            <p className="text-3xl font-bold">{stats.assigned}</p>
          </div>
          <div className="card bg-purple-500 text-white">
            <h3 className="text-sm font-medium">In Progress</h3>
            <p className="text-3xl font-bold">{stats.inProgress}</p>
          </div>
          <div className="card bg-green-500 text-white">
            <h3 className="text-sm font-medium">Resolved</h3>
            <p className="text-3xl font-bold">{stats.resolved}</p>
          </div>
          <div className="card bg-red-500 text-white">
            <h3 className="text-sm font-medium">Escalated</h3>
            <p className="text-3xl font-bold">{stats.escalated}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Status Distribution</h2>
            <div className="h-80 flex items-center justify-center">
              <Pie data={pieData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Complaints by Status</h2>
            <div className="h-80">
              <Bar data={barData} options={{ maintainAspectRatio: false, responsive: true }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
