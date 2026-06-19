import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminComplaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [assignOfficerId, setAssignOfficerId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [complaintsRes, officersRes] = await Promise.all([
        api.get('/complaints/all'),
        api.get('/users/officers')
      ]);
      setComplaints(complaintsRes.data);
      setOfficers(officersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!assignOfficerId || !selectedComplaint) return;

    try {
      await api.put(`/complaints/${selectedComplaint.id}/assign`, {
        officerId: parseInt(assignOfficerId)
      });
      alert('Complaint assigned successfully!');
      fetchData();
      setSelectedComplaint(null);
      setAssignOfficerId('');
    } catch (error) {
      console.error('Error assigning complaint:', error);
      alert('Failed to assign complaint');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage All Complaints</h1>

        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Priority</th>
                  <th className="text-left py-3 px-4">Submitted By</th>
                  <th className="text-left py-3 px-4">Assigned To</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map(complaint => (
                  <tr key={complaint.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{complaint.id}</td>
                    <td className="py-3 px-4">{complaint.title}</td>
                    <td className="py-3 px-4">{complaint.category}</td>
                    <td className="py-3 px-4">
                      <span className={`status-badge status-${complaint.status.toLowerCase()}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">{complaint.user?.name || 'N/A'}</td>
                    <td className="py-3 px-4">{complaint.assignedOfficer?.name || 'Unassigned'}</td>
                    <td className="py-3 px-4">
                      {!complaint.assignedOfficer && (
                        <button
                          onClick={() => setSelectedComplaint(complaint)}
                          className="btn btn-primary text-xs"
                        >
                          Assign
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assignment Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Assign Complaint</h2>
              <p className="text-gray-600 mb-4">
                Complaint: <strong>{selectedComplaint.title}</strong>
              </p>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Select Officer</label>
                <select
                  className="input-field"
                  value={assignOfficerId}
                  onChange={(e) => setAssignOfficerId(e.target.value)}
                >
                  <option value="">Choose an officer...</option>
                  {officers.map(officer => (
                    <option key={officer.id} value={officer.id}>
                      {officer.name} - {officer.ward || 'No Ward'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <button onClick={handleAssign} className="btn btn-primary flex-1">
                  Assign
                </button>
                <button
                  onClick={() => {
                    setSelectedComplaint(null);
                    setAssignOfficerId('');
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;
