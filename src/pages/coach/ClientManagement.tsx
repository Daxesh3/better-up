import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const ClientManagement: React.FC = () => {
    const navigate = useNavigate();

    const handleViewDetails = (id: string) => {
        navigate(`/coach/clients/${id}`);
    };

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Client Management</h1>
                    <p className='text-gray-600 dark:text-gray-400'>Manage and track your coaching relationships</p>
                </div>
                <Button variant='primary' icon={<Plus size={18} />}>
                    Add New Client
                </Button>
            </div>

            <Card>
                <CardHeader title='Client Overview' subtitle='View and manage all your clients' icon={<Users size={18} />} />
                <CardContent>
                    <div className='flex flex-col md:flex-row gap-4 mb-6'>
                        <div className='flex-1 relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Search size={18} className='text-gray-400' />
                            </div>
                            <input
                                type='text'
                                placeholder='Search clients...'
                                className='block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </div>
                        <Button variant='outline' icon={<Filter size={18} />}>
                            Filter
                        </Button>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                            <thead>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                                        Client
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                                        Company
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                                        Status
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                                        Progress
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                                        Next Session
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                                {clients.map((client) => (
                                    <tr key={client.id} className='hover:bg-gray-50 dark:hover:bg-gray-750'>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex items-center'>
                                                <div className='h-10 w-10 flex-shrink-0'>
                                                    <img className='h-10 w-10 rounded-full object-cover' src={client.image} alt={client.name} />
                                                </div>
                                                <div className='ml-4'>
                                                    <div className='text-sm font-medium text-gray-900 dark:text-gray-100'>{client.name}</div>
                                                    <div className='text-sm text-gray-500 dark:text-gray-400'>{client.role}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='text-sm text-gray-900 dark:text-gray-100'>{client.company}</div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    client.status === 'active'
                                                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                                                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                                                }`}
                                            >
                                                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex items-center'>
                                                <div className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full'>
                                                    <div className='h-2 bg-indigo-600 rounded-full' style={{ width: `${client.progress}%` }} />
                                                </div>
                                                <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>{client.progress}%</span>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                                            {client.nextSession ? new Date(client.nextSession).toLocaleDateString() : 'Not scheduled'}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                            <Button variant='ghost' size='sm' onClick={() => handleViewDetails(client.id)}>
                                                View Details
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export const clients = [
    {
        id: '1',
        name: 'Emma Thompson',
        role: 'CEO',
        company: 'Innovate Tech',
        email: 'emma@innovatetech.com',
        phone: '+1 (555) 123-4567',
        startDate: '2024-01-15',
        status: 'active',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        progress: 75,
        nextSession: '2024-03-17T14:00:00',
        lastSession: '2024-03-10T14:00:00',
        goals: [
            { id: 1, title: 'Improve leadership skills', progress: 80 },
            { id: 2, title: 'Develop strategic thinking', progress: 60 },
            { id: 3, title: 'Enhance team communication', progress: 45 },
        ],
        recentActivities: [
            { id: 1, type: 'session', title: 'Coaching Session', date: '2024-03-10', description: 'Leadership Development Focus' },
            { id: 2, type: 'task', title: 'Completed Assessment', date: '2024-03-08', description: 'Leadership Style Assessment' },
            { id: 3, type: 'message', title: 'Sent Message', date: '2024-03-07', description: 'Weekly Progress Update' },
        ],
    },
    {
        id: '2',
        name: 'Robert Chen',
        role: 'CTO',
        company: 'Future Systems',
        email: 'robert@futuresystems.com',
        phone: '+1 (555) 987-6543',
        startDate: '2024-02-01',
        status: 'active',
        image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
        progress: 60,
        nextSession: '2024-03-15T10:00:00',
        lastSession: '2024-03-08T10:00:00',
        goals: [
            { id: 1, title: 'Improve technical leadership', progress: 70 },
            { id: 2, title: 'Enhance decision-making', progress: 50 },
        ],
        recentActivities: [
            { id: 1, type: 'session', title: 'Coaching Session', date: '2024-03-08', description: 'Technical Leadership Focus' },
            { id: 2, type: 'task', title: 'Completed Workshop', date: '2024-03-06', description: 'Decision-Making Workshop' },
        ],
    },
    {
        id: '3',
        name: 'Sarah Wilson',
        role: 'Director',
        company: 'Global Solutions',
        email: 'sarah@globalsolutions.com',
        phone: '+1 (555) 456-7890',
        startDate: '2024-01-20',
        status: 'paused',
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        progress: 45,
        nextSession: null,
        lastSession: '2024-03-05T09:00:00',
        goals: [
            { id: 1, title: 'Improve time management', progress: 50 },
            { id: 2, title: 'Enhance team collaboration', progress: 40 },
        ],
        recentActivities: [
            { id: 1, type: 'session', title: 'Coaching Session', date: '2024-03-05', description: 'Time Management Focus' },
            { id: 2, type: 'message', title: 'Sent Message', date: '2024-03-03', description: 'Follow-up on team collaboration' },
        ],
    },
];

export default ClientManagement;
