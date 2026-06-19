import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  if (user) {
    if (user.role === 'ADMIN') {
      window.location.href = '/admin/dashboard';
      return null;
    } else if (user.role === 'OFFICER') {
      window.location.href = '/officer/dashboard';
      return null;
    } else {
      window.location.href = '/dashboard';
      return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-white mb-16">
          <h1 className="text-6xl font-bold mb-6">
            🏛️ Nagara Paarvai 360
          </h1>
          <p className="text-2xl mb-8">
            Empowering Citizens, Transparent Governance
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transition-colors">
              Get Started
            </Link>
            <Link to="/public" className="border-2 border-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-white hover:text-primary transition-colors">
              View Public Portal
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Report Issues</h3>
            <p className="text-gray-600">
              Easily report civic issues like road damage, garbage collection, water supply, and more with location tracking.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <div className="text-5xl mb-4">👁️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Track Progress</h3>
            <p className="text-gray-600">
              Monitor real-time status updates and see how your complaints are being addressed by authorities.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-2xl">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Full Transparency</h3>
            <p className="text-gray-600">
              Access public portal to view resolution rates, statistics, and government accountability metrics.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center text-white">
          <h2 className="text-4xl font-bold mb-12">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-xl">Digital</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p className="text-xl">Available</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Real-Time</div>
              <p className="text-xl">Tracking</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Transparent</div>
              <p className="text-xl">Governance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
