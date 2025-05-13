import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building, Calendar, TrendingUp, MessageSquare, CheckSquare, Clock, FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { clients } from './ClientManagement';

const ClientDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the client by ID
    const client = clients.find((client) => client.id === id);

    if (!client) {
        return (
            <div className='text-center mt-10'>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Client Not Found</h1>
                <Button variant='primary' onClick={() => navigate(-1)} className='mt-4'>
                    Go Back
                </Button>
            </div>
        );
    }

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'session':
                return <Calendar size={16} />;
            case 'task':
                return <CheckSquare size={16} />;
            case 'message':
                return <MessageSquare size={16} />;
            default:
                return <FileText size={16} />;
        }
    };

    return (
        <div className='relative'>
            {/* Back Button */}
            <div className='absolute top-2 left-0 z-50'>
                <Button variant='outline' icon={<ArrowLeft size={18} />} onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>
            <div className='space-y-6 pt-16'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Client Profile</h1>
                        <p className='text-gray-600 dark:text-gray-400'>Detailed view and management of client relationship</p>
                    </div>
                    <div className='flex space-x-3'>
                        <Button variant='outline' icon={<MessageSquare size={18} />}>
                            Message
                        </Button>
                        <Button variant='primary' icon={<Calendar size={18} />}>
                            Schedule Session
                        </Button>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    {/* Client Info */}
                    <div className='lg:col-span-2 space-y-6'>
                        <Card>
                            <CardContent className='p-6'>
                                <div className='flex items-center space-x-4'>
                                    <img src={client.image} alt={client.name} className='h-20 w-20 rounded-full object-cover' />
                                    <div>
                                        <h2 className='text-xl font-bold text-gray-900 dark:text-gray-100'>{client.name}</h2>
                                        <div className='mt-1 flex items-center space-x-2 text-gray-500 dark:text-gray-400'>
                                            <Building size={16} />
                                            <span>
                                                {client.role} at {client.company}
                                            </span>
                                        </div>
                                        <div className='mt-2'>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    client.status === 'active'
                                                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                                                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                                                }`}
                                            >
                                                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div>
                                        <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Contact Information</h3>
                                        <div className='mt-2 space-y-2'>
                                            <p className='text-sm text-gray-900 dark:text-gray-100'>{client.email}</p>
                                            <p className='text-sm text-gray-900 dark:text-gray-100'>{client.phone}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Coaching Details</h3>
                                        <div className='mt-2 space-y-2'>
                                            <p className='text-sm text-gray-900 dark:text-gray-100'>
                                                Started: {new Date(client.startDate).toLocaleDateString()}
                                            </p>
                                            <p className='text-sm text-gray-900 dark:text-gray-100'>
                                                Next Session: {new Date(client.nextSession as string).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Goals Progress */}
                        <Card>
                            <CardHeader title='Goals Progress' subtitle='Tracking development objectives' icon={<TrendingUp size={18} />} />
                            <CardContent>
                                <div className='space-y-4'>
                                    {client.goals.map((goal) => (
                                        <div key={goal.id}>
                                            <div className='flex justify-between items-center mb-1'>
                                                <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{goal.title}</span>
                                                <span className='text-sm text-gray-500 dark:text-gray-400'>{goal.progress}%</span>
                                            </div>
                                            <div className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full'>
                                                <div className='h-2 bg-indigo-600 rounded-full' style={{ width: `${goal.progress}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Activity Feed */}
                    <div>
                        <Card>
                            <CardHeader title='Recent Activity' subtitle='Latest interactions and progress' icon={<Clock size={18} />} />
                            <CardContent className='space-y-4'>
                                {client.recentActivities.map((activity) => (
                                    <div key={activity.id} className='flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800'>
                                        <div className='flex-shrink-0'>
                                            <div className='h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400'>
                                                {getActivityIcon(activity.type)}
                                            </div>
                                        </div>
                                        <div>
                                            <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>{activity.title}</p>
                                            <p className='text-xs text-gray-500 dark:text-gray-400'>{activity.description}</p>
                                            <p className='text-xs text-gray-400 dark:text-gray-500 mt-1'>
                                                {new Date(activity.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDetail;
