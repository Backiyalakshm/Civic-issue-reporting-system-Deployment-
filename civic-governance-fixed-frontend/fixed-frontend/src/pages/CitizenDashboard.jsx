import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const CitizenDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    inProgress: 0,
    resolved: 0
  });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get(`/complaints/user/${user.userId}`);
      const complaints = response.data;
      
      setStats({
        total: complaints.length,
        submitted: complaints.filter(c => c.status === 'SUBMITTED').length,
        inProgress: complaints.filter(c => c.status === 'IN_PROGRESS' || c.status === 'ASSIGNED').length,
        resolved: complaints.filter(c => c.status === 'RESOLVED').length
      });
      
      setRecentComplaints(complaints.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome, {user.name}! 👋
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <h3 className="text-lg font-medium mb-2">Total Complaints</h3>
            <p className="text-4xl font-bold">{stats.total}</p>
          </div>
          
          <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <h3 className="text-lg font-medium mb-2">Submitted</h3>
            <p className="text-4xl font-bold">{stats.submitted}</p>
          </div>
          
          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <h3 className="text-lg font-medium mb-2">In Progress</h3>
            <p className="text-4xl font-bold">{stats.inProgress}</p>
          </div>
          
          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <h3 className="text-lg font-medium mb-2">Resolved</h3>
            <p className="text-4xl font-bold">{stats.resolved}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/report" className="btn btn-primary">
              📝 Report New Issue
            </Link>
            <Link to="/my-complaints" className="btn btn-secondary">
              📋 View All My Complaints
            </Link>
            <Link to="/assets" className="btn btn-secondary">
              🏗️ View Public Assets
            </Link>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          {recentComplaints.length === 0 ? (
            <p className="text-gray-600">No complaints yet. Report your first issue!</p>
          ) : (
            <div className="space-y-4">
              {recentComplaints.map(complaint => (
                <div key={complaint.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{complaint.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{complaint.category}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`status-badge status-${complaint.status.toLowerCase()}`}>
                      {complaint.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;
