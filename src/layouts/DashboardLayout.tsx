import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Users, MessageSquare, Calendar, PanelLeft, Lightbulb, LogOut, Moon, Sun, Menu, X, CheckSquare, Brain, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

type DashboardLayoutProps = {
    userRole: 'coach' | 'client';
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userRole }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive
                ? 'bg-indigo-100 text-indigo-900 font-medium dark:bg-indigo-900/40 dark:text-indigo-100'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        }`;

    // Navigation items based on user role
    const getNavItems = () => {
        if (userRole === 'coach') {
            return [
                { to: '/coach', icon: <PanelLeft size={20} />, label: 'Dashboard' },
                { to: '/coach/clients', icon: <Users size={20} />, label: 'Clients' },
                { to: '/coach/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
                { to: '/coach/sessions', icon: <Calendar size={20} />, label: 'Sessions' },
                { to: '/coach/canvas', icon: <Lightbulb size={20} />, label: 'Canvas' },
                { to: '/coach/agent', icon: <Brain size={20} />, label: 'AI Agent' },
            ];
        } else {
            return [
                { to: '/client', icon: <PanelLeft size={20} />, label: 'Dashboard' },
                { to: '/client/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
                { to: '/client/sessions', icon: <Calendar size={20} />, label: 'Sessions' },
                { to: '/client/tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
            ];
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col'>
            {/* Top navigation bar */}
            <header className=' bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10'>
                <div className='flex items-center justify-between px-4 py-3'>
                    <div className='flex items-center'>
                        <button
                            onClick={toggleSidebar}
                            className='md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 focus:outline-none'
                        >
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <div className='ml-4 flex items-center'>
                            <Brain className='h-8 w-8 text-indigo-600 dark:text-indigo-400' />
                            <span className='ml-2 text-xl font-semibold text-gray-800 dark:text-gray-200'>CoachAI</span>
                        </div>
                    </div>

                    <div className='flex items-center space-x-3'>
                        <button
                            onClick={toggleTheme}
                            className='p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 focus:outline-none'
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className='relative'>
                            <div className='flex items-center space-x-3 cursor-pointer'>
                                <div className='flex flex-col items-end'>
                                    <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{user?.name}</span>
                                    <span className='text-xs text-gray-500 dark:text-gray-400 capitalize'>{user?.role}</span>
                                </div>
                                {user?.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt={user.name}
                                        className='h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-700'
                                    />
                                ) : (
                                    <UserCircle className='h-10 w-10 text-gray-400 dark:text-gray-600' />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className='h-[calc(100vh-65px)] flex '>
                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out  ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0`}
                >
                    <div className='flex flex-col h-full'>
                        <nav className='flex-1 px-3 py-4 space-y-1 overflow-y-auto'>
                            {getNavItems().map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={navLinkClasses}
                                    onClick={closeSidebar}
                                    end={item.to === '/coach' || item.to === '/client'}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </nav>

                        <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                            <button
                                onClick={logout}
                                className='flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200'
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <main className='flex-1 overflow-y-auto p-4 md:p-6 pt-20 md:pt-6'>
                    {/* Backdrop for mobile sidebar */}
                    {sidebarOpen && <div className='fixed inset-0 bg-black/50 z-10 md:hidden' onClick={closeSidebar} />}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
