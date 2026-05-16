import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import UserDashboard from './pages/UserDashboard';
import BookRoom from './pages/BookRoom';
import About from './pages/About';
import Navbar from './components/Navbar';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/about" element={<About />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
            <Route path="/book/:roomUuid" element={<BookRoom />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="hotels" element={<div>Hotels Management</div>} />
              <Route path="rooms" element={<div>Rooms Management</div>} />
              <Route path="bookings" element={<div>Bookings Management</div>} />
              <Route path="payments" element={<div>Payments Management</div>} />
              <Route path="users" element={<div>Users Management</div>} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
