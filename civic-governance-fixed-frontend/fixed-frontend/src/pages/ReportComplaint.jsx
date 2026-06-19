import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const ReportComplaint = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Road',
    location: '',
    latitude: null,
    longitude: null,
    priority: 'MEDIUM',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = ['Road', 'Garbage', 'Water', 'Streetlight', 'Drainage', 'Other'];
  const priorities = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/complaints/create', {
        ...formData,
        userId: user.userId
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/my-complaints');
      }, 2000);
    } catch (error) {
      console.error('Error creating complaint:', error);
      alert('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: `${position.coords.latitude}, ${position.coords.longitude}`
          });
          alert('Location captured successfully!');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Report an Issue</h1>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              ✅ Complaint submitted successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Issue Title *</label>
              <input
                type="text"
                className="input-field"
                placeholder="Brief description of the issue"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Category *</label>
              <select
                className="input-field"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                className="input-field"
                rows="4"
                placeholder="Detailed description of the issue..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Priority</label>
              <select
                className="input-field"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Location</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter address or use GPS"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="btn btn-secondary whitespace-nowrap"
                >
                  📍 Get GPS
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Image URL (Optional)</label>
              <input
                type="url"
                className="input-field"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportComplaint;
