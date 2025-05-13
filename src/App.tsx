import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Coach Pages
import CoachDashboard from './pages/coach/Dashboard';
import ClientManagement from './pages/coach/ClientManagement';
import ClientDetail from './pages/coach/ClientDetail';
import CoachingCanvas from './pages/coach/CoachingCanvas';
import AgentConfiguration from './pages/coach/AgentConfiguration';
import CoachMessages from './pages/coach/Messages';
import CoachingSessions from './pages/coach/Sessions';

// Client Pages
import ClientDashboard from './pages/client/Dashboard';
import ClientMessages from './pages/client/Messages';
import ClientSessions from './pages/client/Sessions';
import ClientTasks from './pages/client/Tasks';

function App() {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <Routes>
                        {/* Auth Routes */}
                        <Route element={<AuthLayout />}>
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/forgot-password' element={<ForgotPassword />} />
                        </Route>

                        {/* Coach Routes */}
                        <Route
                            path='/coach'
                            element={
                                <ProtectedRoute requiredRole='coach'>
                                    <DashboardLayout userRole='coach' />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<CoachDashboard />} />
                            <Route path='clients' element={<ClientManagement />} />
                            <Route path='clients/:id' element={<ClientDetail />} />
                            <Route path='canvas' element={<CoachingCanvas />} />
                            <Route path='agent' element={<AgentConfiguration />} />
                            <Route path='messages' element={<CoachMessages />} />
                            <Route path='sessions' element={<CoachingSessions />} />
                        </Route>

                        {/* Client Routes */}
                        <Route
                            path='/client'
                            element={
                                <ProtectedRoute requiredRole='client'>
                                    <DashboardLayout userRole='client' />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<ClientDashboard />} />
                            <Route path='messages' element={<ClientMessages />} />
                            <Route path='sessions' element={<ClientSessions />} />
                            <Route path='tasks' element={<ClientTasks />} />
                        </Route>

                        {/* Redirect root to login */}
                        <Route path='/' element={<Navigate to='/login' />} />
                        <Route path='*' element={<Navigate to='/login' />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
