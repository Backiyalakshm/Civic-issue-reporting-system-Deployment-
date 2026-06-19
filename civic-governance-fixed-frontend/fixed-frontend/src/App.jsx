import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CitizenDashboard from './pages/CitizenDashboard';
import ReportComplaint from './pages/ReportComplaint';
import MyComplaints from './pages/MyComplaints';
import Assets from './pages/Assets';
import OfficerDashboard from './pages/OfficerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminComplaints from './pages/AdminComplaints';
import PublicPortal from './pages/PublicPortal';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/public" element={<PublicPortal />} />

            {/* Citizen Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['CITIZEN']}>
                  <CitizenDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute allowedRoles={['CITIZEN']}>
                  <ReportComplaint />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-complaints"
              element={
                <ProtectedRoute allowedRoles={['CITIZEN']}>
                  <MyComplaints />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assets"
              element={
                <ProtectedRoute>
                  <Assets />
                </ProtectedRoute>
              }
            />

            {/* Officer Routes */}
            <Route
              path="/officer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['OFFICER']}>
                  <OfficerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/complaints"
              element={
                <ProtectedRoute allowedRoles={['OFFICER']}>
                  <OfficerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer/assets"
              element={
                <ProtectedRoute allowedRoles={['OFFICER']}>
                  <Assets />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/complaints"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminComplaints />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/assets"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <Assets />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <Assets />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
