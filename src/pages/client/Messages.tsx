import React from 'react';
import { Phone, Video, Image, Paperclip, Send, MoreVertical } from 'lucide-react';
import { Card } from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const ClientMessages: React.FC = () => {
    // Mock data
    const coach = {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Executive Coach',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        online: true,
    };

    const messages = [
        {
            id: 1,
            sender: 'client',
            message: 'Hi Sarah, I wanted to follow up on our last session.',
            time: '10:00 AM',
        },
        {
            id: 2,
            sender: 'coach',
            message: 'Of course! How are you progressing with the action items we discussed?',
            time: '10:05 AM',
        },
        {
            id: 3,
            sender: 'client',
            message: `I've completed the leadership assessment and started implementing the communication framework we talked about.`,
            time: '10:15 AM',
        },
        {
            id: 4,
            sender: 'coach',
            message: `That's excellent progress! Have you noticed any immediate impacts in your team interactions?`,
            time: '10:20 AM',
        },
        {
            id: 5,
            sender: 'client',
            message: `Yes, actually! The team seems more engaged during our meetings, and I'm getting better at delegating tasks.`,
            time: '10:25 AM',
        },
        {
            id: 6,
            sender: 'client',
            message: 'Thank you for the session today!',
            time: '10:30 AM',
        },
    ];

    return (
        <div className='h-[calc(100vh-theme(spacing.20))]'>
            <Card className='h-full flex flex-col'>
                <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <div className='relative'>
                                <img src={coach.image} alt={coach.name} className='h-10 w-10 rounded-full object-cover' />
                                {coach.online && (
                                    <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-gray-800' />
                                )}
                            </div>
                            <div>
                                <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>{coach.name}</h2>
                                <p className='text-sm text-gray-500 dark:text-gray-400'>{coach.role}</p>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Button variant='outline' size='sm' icon={<Phone size={16} />} />
                            <Button variant='outline' size='sm' icon={<Video size={16} />} />
                            <Button variant='outline' size='sm' icon={<MoreVertical size={16} />} />
                        </div>
                    </div>
                </div>

                <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[70%] ${
                                    message.sender === 'client'
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                                } rounded-lg px-4 py-2`}
                            >
                                <p className='text-sm'>{message.message}</p>
                                <p className={`text-xs mt-1 ${message.sender === 'client' ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>
                                    {message.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                    <div className='flex items-center space-x-2'>
                        <Button variant='outline' size='sm' icon={<Image size={16} />} />
                        <Button variant='outline' size='sm' icon={<Paperclip size={16} />} />
                        <input
                            type='text'
                            placeholder='Type a message...'
                            className='flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                        />
                        <Button variant='primary' size='sm' icon={<Send size={16} />} />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ClientMessages;
