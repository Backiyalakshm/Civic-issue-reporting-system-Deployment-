import { useState, useEffect } from 'react';
import api from '../services/api';

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await api.get('/assets/all');
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      OPERATIONAL: 'bg-green-100 text-green-800',
      NEEDS_MAINTENANCE: 'bg-yellow-100 text-yellow-800',
      UNDER_MAINTENANCE: 'bg-orange-100 text-orange-800',
      OUT_OF_SERVICE: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="p-8 text-center">Loading assets...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Public Assets</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.length === 0 ? (
            <div className="col-span-full card text-center py-12">
              <p className="text-gray-600 text-lg">No assets found.</p>
            </div>
          ) : (
            assets.map(asset => (
              <div key={asset.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{asset.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(asset.status)}`}>
                    {asset.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Type:</span> {asset.type}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {asset.location || 'N/A'}
                  </div>
                  {asset.description && (
                    <div>
                      <span className="font-medium">Description:</span> {asset.description}
                    </div>
                  )}
                  {asset.lastMaintenanceDate && (
                    <div>
                      <span className="font-medium">Last Maintenance:</span>{' '}
                      {new Date(asset.lastMaintenanceDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Assets;
