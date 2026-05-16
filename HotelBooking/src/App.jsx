import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import HotelDetails from './pages/HotelDetails';
import UserDashboard from './pages/UserDashboard';
import BookRoom from './pages/BookRoom';
import About from './pages/About';
import Navbar from './components/Navbar';

import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminRooms from './pages/Admin/Rooms';
import AdminRoomTypes from './pages/Admin/RoomTypes';
import AdminBookings from './pages/Admin/Bookings';
import AdminHotelSettings from './pages/Admin/HotelSettings';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="h-screen flex flex-col overflow-hidden text-foreground">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:id" element={<HotelDetails />} />
              <Route path="/hotels/:id" element={<HotelDetails />} />
              <Route path="/about" element={<About />} />
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
                <Route path="rooms" element={<AdminRooms />} />
                <Route path="room-types" element={<AdminRoomTypes />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="hotel-settings" element={<AdminHotelSettings />} />
                <Route path="payments" element={<div className="p-8 text-slate-700">Payments Management</div>} />
                <Route path="users" element={<div className="p-8 text-slate-700">Users Management</div>} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
