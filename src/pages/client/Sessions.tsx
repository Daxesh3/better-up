import React from 'react';
import { Calendar, Clock, Video, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const ClientSessions: React.FC = () => {
    // Mock data
    const sessions = [
        {
            id: 1,
            type: 'One-on-One',
            date: '2024-03-15',
            time: '10:00 AM',
            duration: '60 min',
            status: 'upcoming',
            notes: 'Leadership development focus',
            coach: {
                name: 'Sarah Johnson',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
            },
        },
        {
            id: 2,
            type: 'Workshop',
            date: '2024-03-20',
            time: '2:00 PM',
            duration: '90 min',
            status: 'upcoming',
            notes: 'Strategic planning workshop',
            coach: {
                name: 'Sarah Johnson',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
            },
        },
        {
            id: 3,
            type: 'One-on-One',
            date: '2024-03-14',
            time: '11:00 AM',
            duration: '45 min',
            status: 'completed',
            notes: 'Goal setting and review',
            coach: {
                name: 'Sarah Johnson',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
            },
        },
    ];

    return (
        <div className='space-y-6'>
            <div>
                <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Coaching Sessions</h1>
                <p className='text-gray-600 dark:text-gray-400'>View your upcoming and past coaching sessions</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
                {/* Calendar View */}
                <div className='lg:col-span-8'>
                    <Card>
                        <CardHeader
                            title='Session Calendar'
                            subtitle='Your schedule for March 2024'
                            icon={<Calendar size={18} />}
                            action={
                                <div className='flex items-center space-x-2'>
                                    <Button variant='outline' size='sm' icon={<ChevronLeft size={16} />} />
                                    <Button variant='outline' size='sm' icon={<ChevronRight size={16} />} />
                                </div>
                            }
                        />
                        <CardContent>
                            <div className='grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden'>
                                {/* Calendar header */}
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <div
                                        key={day}
                                        className='bg-gray-50 dark:bg-gray-800 px-2 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400'
                                    >
                                        {day}
                                    </div>
                                ))}

                                {/* Calendar days */}
                                {Array.from({ length: 35 }).map((_, index) => {
                                    const day = index - 4; // Assuming March 1st starts on a Friday
                                    const isToday = day === 14; // Assuming today is March 15
                                    const hasSession = [15, 20].includes(day);

                                    return (
                                        <div
                                            key={index}
                                            className={`min-h-[100px] bg-white dark:bg-gray-800 p-2 ${
                                                day < 1 || day > 31 ? 'bg-gray-50 dark:bg-gray-750' : ''
                                            }`}
                                        >
                                            {day > 0 && day <= 31 && (
                                                <>
                                                    <p
                                                        className={`text-sm font-medium ${
                                                            isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-gray-100'
                                                        }`}
                                                    >
                                                        {day}
                                                    </p>
                                                    {hasSession && (
                                                        <div className='mt-1'>
                                                            <div className='bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded p-1'>
                                                                10:00 AM - Session
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Upcoming Sessions */}
                <div className='lg:col-span-4 space-y-6'>
                    <Card>
                        <CardHeader title='Upcoming Sessions' subtitle='Your next coaching sessions' icon={<Clock size={18} />} />
                        <CardContent className='space-y-4'>
                            {sessions
                                .filter((session) => session.status === 'upcoming')
                                .map((session) => (
                                    <div key={session.id} className='p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3'>
                                        <div className='flex items-center space-x-3'>
                                            <img src={session.coach.image} alt={session.coach.name} className='h-10 w-10 rounded-full object-cover' />
                                            <div>
                                                <h3 className='font-medium text-gray-900 dark:text-gray-100'>{session.type}</h3>
                                                <p className='text-sm text-gray-500 dark:text-gray-400'>with {session.coach.name}</p>
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between text-sm'>
                                            <div className='flex items-center text-gray-500 dark:text-gray-400'>
                                                <Clock size={16} className='mr-1' />
                                                <span>
                                                    {session.time} ({session.duration})
                                                </span>
                                            </div>
                                            <Button variant='primary' size='sm' icon={<Video size={16} />}>
                                                Join
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                        </CardContent>
                    </Card>

                    {/* Past Sessions */}
                    <Card>
                        <CardHeader title='Past Sessions' subtitle='Previous coaching sessions' icon={<Clock size={18} />} />
                        <CardContent className='space-y-4'>
                            {sessions
                                .filter((session) => session.status === 'completed')
                                .map((session) => (
                                    <div
                                        key={session.id}
                                        className='flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750'
                                    >
                                        <img src={session.coach.image} alt={session.coach.name} className='h-10 w-10 rounded-full object-cover' />
                                        <div className='flex-1'>
                                            <h3 className='font-medium text-gray-900 dark:text-gray-100'>{session.type}</h3>
                                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                                                {new Date(session.date).toLocaleDateString()} - {session.time}
                                            </p>
                                        </div>
                                        <Button variant='ghost' size='sm' icon={<FileText size={16} />}>
                                            Notes
                                        </Button>
                                    </div>
                                ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ClientSessions;
