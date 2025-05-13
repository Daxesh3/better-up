import React from 'react';
import { Calendar, Users, MessageSquare, Plus, Clock, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UpcomingSession {
    id: string;
    clientName: string;
    date: string;
    time: string;
    type: 'one-on-one' | 'workshop';
}

const Dashboard: React.FC = () => {
    // Mock data - replace with actual data from your backend
    const upcomingSessions: UpcomingSession[] = [
        {
            id: '1',
            clientName: 'John Doe',
            date: '2024-03-20',
            time: '10:00 AM',
            type: 'one-on-one',
        },
        {
            id: '2',
            clientName: 'Jane Smith',
            date: '2024-03-20',
            time: '2:00 PM',
            type: 'workshop',
        },
    ];

    const quickActions = [
        {
            title: 'New Session',
            icon: <Plus className='h-6 w-6' />,
            link: '/sessions/new',
            color: 'bg-blue-500',
        },
        {
            title: 'Add Client',
            icon: <Users className='h-6 w-6' />,
            link: '/clients/new',
            color: 'bg-green-500',
        },
        {
            title: 'View Calendar',
            icon: <Calendar className='h-6 w-6' />,
            link: '/calendar',
            color: 'bg-purple-500',
        },
        {
            title: 'Messages',
            icon: <MessageSquare className='h-6 w-6' />,
            link: '/messages',
            color: 'bg-orange-500',
        },
    ];

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='max-w-7xl mx-auto'>
                <h1 className='text-3xl font-bold text-gray-900 mb-8'>Coach Dashboard</h1>

                {/* Quick Actions */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {quickActions.map((action, index) => (
                        <Link key={index} to={action.link} className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow'>
                            <div className='flex items-center space-x-4'>
                                <div className={`${action.color} p-3 rounded-lg text-white`}>{action.icon}</div>
                                <span className='text-lg font-medium text-gray-900'>{action.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Upcoming Sessions */}
                <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-xl font-semibold text-gray-900'>Upcoming Sessions</h2>
                        <Link to='/sessions/new' className='flex items-center space-x-2 text-blue-600 hover:text-blue-700'>
                            <Plus className='h-5 w-5' />
                            <span>New Session</span>
                        </Link>
                    </div>
                    <div className='space-y-4'>
                        {upcomingSessions.map((session) => (
                            <div key={session.id} className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                                <div className='flex items-center space-x-4'>
                                    <div className='bg-blue-100 p-2 rounded-lg'>
                                        <Clock className='h-5 w-5 text-blue-600' />
                                    </div>
                                    <div>
                                        <h3 className='font-medium text-gray-900'>{session.clientName}</h3>
                                        <p className='text-sm text-gray-500'>
                                            {session.date} at {session.time}
                                        </p>
                                    </div>
                                </div>
                                <span className='px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800'>
                                    {session.type === 'one-on-one' ? 'One-on-One' : 'Workshop'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Statistics */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <div className='flex items-center space-x-4'>
                            <div className='bg-green-100 p-3 rounded-lg'>
                                <Users className='h-6 w-6 text-green-600' />
                            </div>
                            <div>
                                <p className='text-sm text-gray-500'>Total Clients</p>
                                <p className='text-2xl font-semibold text-gray-900'>24</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <div className='flex items-center space-x-4'>
                            <div className='bg-purple-100 p-3 rounded-lg'>
                                <Calendar className='h-6 w-6 text-purple-600' />
                            </div>
                            <div>
                                <p className='text-sm text-gray-500'>Sessions This Week</p>
                                <p className='text-2xl font-semibold text-gray-900'>12</p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white rounded-lg shadow-md p-6'>
                        <div className='flex items-center space-x-4'>
                            <div className='bg-orange-100 p-3 rounded-lg'>
                                <BarChart2 className='h-6 w-6 text-orange-600' />
                            </div>
                            <div>
                                <p className='text-sm text-gray-500'>Client Satisfaction</p>
                                <p className='text-2xl font-semibold text-gray-900'>4.8/5</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
