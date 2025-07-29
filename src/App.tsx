import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Flights from './pages/Flights';
import Trains from './pages/Trains';
import Hotels from './pages/Hotels';
import Cars from './pages/Cars';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Payment from './pages/Payment';
import DestinationDetail from './pages/DestinationDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BookingProvider>
          <Router>
            <div className="min-h-screen">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/trains" element={<Trains />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/cars" element={<Cars />} />
                              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/chat" element={<Chat />} />
                            <Route path="/payment" element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              } />
              <Route path="/destination/:destination" element={<DestinationDetail />} />
              <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </BookingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;