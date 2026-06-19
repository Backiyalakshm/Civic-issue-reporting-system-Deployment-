import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const MyComplaints = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await api.get(`/complaints/user/${user.userId}`);
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewComplaintDetails = async (complaint) => {
    setSelectedComplaint(complaint);
    try {
      const response = await api.get(`/complaints/${complaint.id}/updates`);
      setUpdates(response.data);
    } catch (error) {
      console.error('Error fetching updates:', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Complaints</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Complaints List */}
          <div className="lg:col-span-2 space-y-4">
            {complaints.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-gray-600 text-lg">No complaints submitted yet.</p>
              </div>
            ) : (
              complaints.map(complaint => (
                <div
                  key={complaint.id}
                  className="card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => viewComplaintDetails(complaint)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{complaint.title}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>📂 {complaint.category}</span>
                        <span>📍 {complaint.location}</span>
                        <span>⏰ {new Date(complaint.createdAt).toLocaleDateString()}</span>
                      </div>
                      {complaint.assignedOfficer && (
                        <p className="text-sm text-gray-600 mt-2">
                          👮 Assigned to: {complaint.assignedOfficer.name}
                        </p>
                      )}
                    </div>
                    <span className={`status-badge status-${complaint.status.toLowerCase()}`}>
                      {complaint.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Complaint Details */}
          <div className="lg:col-span-1">
            {selectedComplaint ? (
              <div className="card sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Complaint Details</h2>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Title</p>
                    <p className="font-medium">{selectedComplaint.title}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="text-gray-800">{selectedComplaint.description || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Priority</p>
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">
                      {selectedComplaint.priority}
                    </span>
                  </div>

                  {selectedComplaint.imageUrl && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Image</p>
                      <img
                        src={selectedComplaint.imageUrl}
                        alt="Complaint"
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Updates Timeline</h3>
                  {updates.length === 0 ? (
                    <p className="text-sm text-gray-600">No updates yet</p>
                  ) : (
                    <div className="space-y-3">
                      {updates.map(update => (
                        <div key={update.id} className="border-l-2 border-blue-500 pl-3">
                          <p className="text-sm font-medium text-gray-800">{update.status}</p>
                          <p className="text-xs text-gray-600">{update.remarks}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(update.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="card text-center py-12">
                <p className="text-gray-600">Select a complaint to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;
