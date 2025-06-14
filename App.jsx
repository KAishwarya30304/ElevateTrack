import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LoginPage from '@/pages/LoginPage';
import EmployeeDashboard from '@/pages/EmployeeDashboard';
import ManagerDashboard from '@/pages/ManagerDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import ReportPage from '@/pages/ReportPage';
import EmployeeDetailPage from '@/pages/EmployeeDetailPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import AdminToolsPage from '@/pages/AdminToolsPage';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import ParticleBackground from '@/components/ParticleBackground';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative">
          <ParticleBackground />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            <Route path="/dashboard/employee" element={
              <ProtectedRoute allowedRoles={['employee', 'manager', 'admin']}>
                <EmployeeDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/manager" element={
              <ProtectedRoute allowedRoles={['manager', 'admin']}>
                <ManagerDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/report" element={
              <ProtectedRoute allowedRoles={['employee', 'manager', 'admin']}>
                <ReportPage />
              </ProtectedRoute>
            } />
            
            <Route path="/employee/:id" element={
              <ProtectedRoute allowedRoles={['manager', 'admin']}>
                <EmployeeDetailPage />
              </ProtectedRoute>
            } />
            
            <Route path="/analytics" element={
              <ProtectedRoute allowedRoles={['manager', 'admin']}>
                <AnalyticsPage />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/tools" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminToolsPage />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;