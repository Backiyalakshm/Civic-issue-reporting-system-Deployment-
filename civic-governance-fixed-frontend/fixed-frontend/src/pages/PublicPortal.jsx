import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const PublicPortal = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublicData();
  }, []);

  const fetchPublicData = async () => {
    try {
      const response = await api.get('/public/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching public data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const { statistics, categoryDistribution, resolutionPercentage, averageRating } = dashboardData;

  const categoryData = {
    labels: Object.keys(categoryDistribution),
    datasets: [{
      data: Object.values(categoryDistribution),
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
        '#ec4899'
      ]
    }]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Public Transparency Portal
          </h1>
          <p className="text-xl text-gray-600">
            Track civic issues and governance in real-time
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white text-center">
            <h3 className="text-lg font-medium mb-2">Total Issues Reported</h3>
            <p className="text-5xl font-bold">{statistics.total}</p>
          </div>

          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white text-center">
            <h3 className="text-lg font-medium mb-2">Issues Resolved</h3>
            <p className="text-5xl font-bold">{statistics.resolved}</p>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white text-center">
            <h3 className="text-lg font-medium mb-2">Resolution Rate</h3>
            <p className="text-5xl font-bold">{resolutionPercentage.toFixed(1)}%</p>
          </div>

          <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white text-center">
            <h3 className="text-lg font-medium mb-2">Citizen Satisfaction</h3>
            <p className="text-5xl font-bold">{averageRating.toFixed(1)}/5</p>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.round(averageRating) ? 'text-white' : 'text-yellow-200'}>
                  ⭐
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Status Breakdown</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Submitted</p>
                <p className="text-3xl font-bold text-blue-600">{statistics.submitted}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Assigned</p>
                <p className="text-3xl font-bold text-yellow-600">{statistics.assigned}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-purple-600">{statistics.inProgress}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600">Escalated</p>
                <p className="text-3xl font-bold text-red-600">{statistics.escalated}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Issues by Category</h2>
            <div className="h-80 flex items-center justify-center">
              <Pie data={categoryData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="card bg-gradient-to-r from-primary to-purple-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Report an Issue?</h2>
          <p className="text-xl mb-6">Join our civic governance platform and make a difference in your community</p>
          <div className="flex gap-4 justify-center">
            <a href="/register" className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Register Now
            </a>
            <a href="/login" className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary transition-colors">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPortal;
