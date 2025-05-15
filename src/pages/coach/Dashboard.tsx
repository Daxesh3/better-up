import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, Calendar, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

import { Card, CardContent, CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { useAuth } from '../../contexts/AuthContext';
import Skeleton from '../../components/shared/Skeleton';

const CoachDashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const getAlertClass = (severity: string) => {
        switch (severity) {
            case 'high':
                return 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800';
            case 'medium':
                return 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800';
            case 'positive':
                return 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800';
            default:
                return 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800';
        }
    };

    useEffect(() => {
        // Simulate loading data from server
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Welcome, {user?.name}</h1>
                    <p className='text-gray-600 dark:text-gray-400'>Here's what's happening with your clients today</p>
                </div>
                <div>
                    <Button variant='primary'>New Session</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {stats.map((stat) => (
                    <Card key={stat.id} className='border-l-4 border-l-indigo-500'>
                        <CardContent className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>{stat.name}</p>
                                <p className='mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100'>{stat.value}</p>
                                <div className='mt-1 flex items-center'>
                                    <span className='text-xs font-medium text-green-600 dark:text-green-400'>{stat.change}</span>
                                    <span className='ml-1 text-xs text-gray-500 dark:text-gray-400'>from last month</span>
                                </div>
                            </div>
                            <div className={`${stat.color} p-3 rounded-full`}>{stat.icon}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Upcoming Sessions */}
                <div className='lg:col-span-2'>
                    <Card>
                        <CardHeader
                            title='Upcoming Sessions'
                            subtitle='Your schedule for today and tomorrow'
                            icon={<Calendar size={18} />}
                            action={
                                <Button variant='outline' size='sm' onClick={() => navigate('/coach/sessions')}>
                                    View Calendar
                                </Button>
                            }
                        />
                        <CardContent className='px-0 py-0'>
                            <div className='divide-y divide-gray-200 dark:divide-gray-700'>
                                {upcomingSessions.map((session) => (
                                    <div
                                        key={session.id}
                                        className='flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors'
                                    >
                                        <div className='flex items-center space-x-3'>
                                            <div className='flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center'>
                                                <span className='font-medium text-indigo-600 dark:text-indigo-400'>
                                                    {session.client
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className='font-medium text-gray-900 dark:text-gray-100'>{session.client}</p>
                                                <div className='flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400'>
                                                    <span>{session.date}</span>
                                                    <span>•</span>
                                                    <span>{session.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'>
                                                {session.type}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Client Alerts */}
                <div>
                    <Card>
                        <CardHeader title='Recent Alerts' subtitle='Updates requiring your attention' icon={<AlertCircle size={18} />} />
                        <CardContent className='space-y-3'>
                            {clientAlerts.map((alert) => (
                                <div key={alert.id} className={`flex items-center space-x-3 p-3 rounded-lg border ${getAlertClass(alert.severity)}`}>
                                    <div className='flex-shrink-0'>{alert.icon}</div>
                                    <div>
                                        <p className='font-medium text-gray-900 dark:text-gray-100'>{alert.client}</p>
                                        <p className='text-sm text-gray-600 dark:text-gray-400'>{alert.alert}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recently Active */}
                    <Card className='mt-6'>
                        <CardHeader title='Recently Active' subtitle='Clients with recent activity' />
                        <CardContent className='space-y-4'>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className='flex items-center space-x-3'>
                                    <div className='flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700'>
                                        <img
                                            src={`https://images.pexels.com/photos/${1000000 + i * 12345}/pexels-photo-${
                                                1000000 + i * 12345
                                            }.jpeg?auto=compress&cs=tinysrgb&w=150`}
                                            alt='Client'
                                            className='h-10 w-10 rounded-full object-cover'
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src =
                                                    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150';
                                            }}
                                        />
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <p className='font-medium text-gray-900 dark:text-gray-100 truncate'>Client Name {i}</p>
                                        <p className='text-sm text-gray-500 dark:text-gray-400'>Active {i * 10} minutes ago</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Demo data
const stats = [
    {
        id: 1,
        name: 'Active Clients',
        value: 24,
        icon: <Users size={20} />,
        change: '+12%',
        color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    },
    {
        id: 2,
        name: 'Sessions This Week',
        value: 18,
        icon: <Calendar size={20} />,
        change: '+5%',
        color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    },
    {
        id: 3,
        name: 'Unread Messages',
        value: 7,
        icon: <MessageSquare size={20} />,
        change: '-2%',
        color: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    },
    {
        id: 4,
        name: 'Client Growth',
        value: '23%',
        icon: <TrendingUp size={20} />,
        change: '+8%',
        color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    },
];

const upcomingSessions = [
    { id: 1, client: 'Emma Thompson', time: '10:00 AM - 11:00 AM', date: 'Today', type: 'One-on-One' },
    { id: 2, client: 'Robert Chen', time: '2:00 PM - 3:00 PM', date: 'Today', type: 'Strategy Session' },
    { id: 3, client: 'Multiple Clients', time: '9:00 AM - 10:30 AM', date: 'Tomorrow', type: 'Group Workshop' },
];

const clientAlerts = [
    {
        id: 1,
        client: 'Julia Martinez',
        alert: 'Missed last two sessions',
        severity: 'high',
        icon: <AlertCircle size={16} className='text-red-500' />,
    },
    {
        id: 2,
        client: 'David Kim',
        alert: 'Completed all assigned tasks',
        severity: 'positive',
        icon: <CheckCircle size={16} className='text-green-500' />,
    },
    { id: 3, client: 'Sarah Wilson', alert: 'Session reminder sent', severity: 'info', icon: <Clock size={16} className='text-blue-500' /> },
];

const DashboardSkeleton = () => (
    <div className='space-y-6'>
        {/* Stats Section */}
        <Skeleton type='text' width='20%' />
        <Skeleton type='text' width='30%' />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {[1, 2, 3, 4].map((i) => (
                <Card key={i} className='px-6 py-8'>
                    <div className='space-y-3'>
                        <Skeleton type='text' width='40%' />
                        <Skeleton type='text' width='60%' />
                    </div>
                </Card>
            ))}
        </div>
        {/* Recent Sessions */}
        <Card className='p-6'>
            <div className='space-y-4'>
                <Skeleton type='text' width='30%' />
                <div className='space-y-3'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='flex items-center space-x-4'>
                            <Skeleton type='avatar' />
                            <div className='flex-1 space-y-2'>
                                <Skeleton type='text' width='75%' />
                                <Skeleton type='text' width='50%' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>

        {/* Upcoming Sessions */}
        <Card className='p-6'>
            <div className='space-y-4'>
                <Skeleton type='text' width='30%' />
                <div className='space-y-3'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='flex items-center space-x-4'>
                            <Skeleton type='avatar' />
                            <div className='flex-1 space-y-2'>
                                <Skeleton type='text' width='75%' />
                                <Skeleton type='text' width='50%' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    </div>
);
export default CoachDashboard;
