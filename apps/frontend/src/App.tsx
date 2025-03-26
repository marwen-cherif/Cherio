import { useEffect } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppSidebar from './components/AppSidebar';
import HomePage from './pages/HomePage';
import BillsPage from './pages/BillsPage';
import ContractsPage from './pages/ContractsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import '@mantine/core/styles.css';
import './App.css';

// Create theme
const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
});

function App() {
  useEffect(() => {
    document.title = 'SyndicCheck';
  }, []);

  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppSidebar>
                    <HomePage />
                  </AppSidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bills"
              element={
                <ProtectedRoute>
                  <AppSidebar>
                    <BillsPage />
                  </AppSidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path="/contracts"
              element={
                <ProtectedRoute>
                  <AppSidebar>
                    <ContractsPage />
                  </AppSidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AppSidebar>
                    <div>Users Page (Coming Soon)</div>
                  </AppSidebar>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <AppSidebar>
                    <div>Settings Page (Coming Soon)</div>
                  </AppSidebar>
                </ProtectedRoute>
              }
            />
            
            {/* Redirect to home if path doesn't match */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
