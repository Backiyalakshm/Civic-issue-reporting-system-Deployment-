import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const OfficerDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    status: '',
    remarks: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await api.get(`/complaints/officer/${user.userId}`);
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updateForm.status) {
      alert('Please select a status');
      return;
    }

    try {
      await api.put(`/complaints/${selectedComplaint.id}/status`, {
        status: updateForm.status,
        remarks: updateForm.remarks,
        updatedBy: user.userId
      });
      alert('Complaint updated successfully!');
      setSelectedComplaint(null);
      setUpdateForm({ status: '', remarks: '' });
      fetchComplaints();
    } catch (error) {
      console.error('Error updating complaint:', error);
      alert('Failed to update complaint');
    }
  };

  const statuses = ['ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'ESCALATED'];

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const stats = {
    total: complaints.length,
    inProgress: complaints.filter(c => c.status === 'IN_PROGRESS').length,
    resolved: complaints.filter(c => c.status === 'RESOLVED').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Officer Dashboard - {user.name}
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-blue-500 text-white">
            <h3 className="text-lg font-medium">Assigned to Me</h3>
            <p className="text-4xl font-bold">{stats.total}</p>
          </div>
          <div className="card bg-purple-500 text-white">
            <h3 className="text-lg font-medium">In Progress</h3>
            <p className="text-4xl font-bold">{stats.inProgress}</p>
          </div>
          <div className="card bg-green-500 text-white">
            <h3 className="text-lg font-medium">Resolved</h3>
            <p className="text-4xl font-bold">{stats.resolved}</p>
          </div>
        </div>

        {/* Complaints List */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Assigned Complaints</h2>
          
          {complaints.length === 0 ? (
            <p className="text-gray-600">No complaints assigned yet.</p>
          ) : (
            <div className="space-y-4">
              {complaints.map(complaint => (
                <div key={complaint.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{complaint.title}</h3>
                      <p className="text-gray-600 mt-1">{complaint.description}</p>
                      <div className="flex gap-4 mt-3 text-sm text-gray-600">
                        <span>📂 {complaint.category}</span>
                        <span>📍 {complaint.location}</span>
                        <span>⚡ {complaint.priority}</span>
                        <span>👤 {complaint.user?.name}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`status-badge status-${complaint.status.toLowerCase()}`}>
                        {complaint.status}
                      </span>
                      <button
                        onClick={() => setSelectedComplaint(complaint)}
                        className="btn btn-primary text-sm"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Update Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Update Complaint</h2>
              <p className="text-gray-600 mb-4">
                <strong>{selectedComplaint.title}</strong>
              </p>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Status *</label>
                  <select
                    className="input-field"
                    value={updateForm.status}
                    onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                    required
                  >
                    <option value="">Select Status...</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Remarks</label>
                  <textarea
                    className="input-field"
                    rows="4"
                    placeholder="Add your remarks here..."
                    value={updateForm.remarks}
                    onChange={(e) => setUpdateForm({ ...updateForm, remarks: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedComplaint(null);
                      setUpdateForm({ status: '', remarks: '' });
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficerDashboard;
