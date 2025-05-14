import React, { useState } from 'react';
import { MessageSquare, Search, Phone, Video, Image, Paperclip, Send, MoreVertical } from 'lucide-react';
import { Card } from '../../components/shared/Card';
import Button from '../../components/shared/Button';

interface Message {
    id: number;
    sender: 'client' | 'coach';
    message: string;
    time: string;
}

interface Client {
    id: string;
    name: string;
    image: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
    messages: Message[];
}

const CoachMessages: React.FC = () => {
    const [selectedClient, setSelectedClient] = useState<string | null>('1');
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedClient) return;

        const client = clients.find((c) => c.id === selectedClient);
        if (!client) return;

        const newMsg: Message = {
            id: client.messages.length + 1,
            sender: 'coach',
            message: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // Update the client's messages
        client.messages.push(newMsg);
        client.lastMessage = newMessage;
        client.time = 'Just now';
        client.unread = 0;

        setNewMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className='h-[calc(100vh-theme(spacing.20))] flex'>
            <div className='flex-1 flex overflow-hidden'>
                <div className='w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col'>
                    <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Search size={18} className='text-gray-400' />
                            </div>
                            <input
                                type='text'
                                placeholder='Search messages...'
                                className='block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </div>
                    </div>

                    <div className='flex-1 overflow-y-auto'>
                        {clients.map((client) => (
                            <div
                                key={client.id}
                                className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 ${
                                    selectedClient === client.id ? 'bg-gray-50 dark:bg-gray-750' : ''
                                }`}
                                onClick={() => setSelectedClient(client.id)}
                            >
                                <div className='flex items-center space-x-3'>
                                    <div className='relative'>
                                        <img src={client.image} alt={client.name} className='h-12 w-12 rounded-full object-cover' />
                                        {client.online && (
                                            <div className='absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-gray-800' />
                                        )}
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <div className='flex items-center justify-between'>
                                            <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate'>{client.name}</h3>
                                            <span className='text-xs text-gray-500 dark:text-gray-400'>{client.time}</span>
                                        </div>
                                        <p className='text-sm text-gray-500 dark:text-gray-400 truncate'>{client.lastMessage}</p>
                                    </div>
                                    {client.unread > 0 && (
                                        <div className='flex-shrink-0'>
                                            <span className='inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-600 text-xs font-medium text-white'>
                                                {client.unread}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex-1 flex flex-col'>
                    {selectedClient ? (
                        <>
                            <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center space-x-3'>
                                        <img
                                            src={clients.find((c) => c.id === selectedClient)?.image}
                                            alt='Client'
                                            className='h-10 w-10 rounded-full object-cover'
                                        />
                                        <div>
                                            <h2 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
                                                {clients.find((c) => c.id === selectedClient)?.name}
                                            </h2>
                                            <p className='text-sm text-gray-500 dark:text-gray-400'>
                                                {clients.find((c) => c.id === selectedClient)?.online ? 'Online' : 'Offline'}
                                            </p>
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
                                {clients
                                    .find((c) => c.id === selectedClient)
                                    ?.messages.map((message) => {
                                        const isCoach = message.sender === 'coach';
                                        return (
                                            <div key={message.id} className={`flex ${isCoach ? 'justify-end' : 'justify-start'}`}>
                                                <div
                                                    className={`max-w-[70%] relative ${
                                                        isCoach
                                                            ? 'bg-indigo-600 text-white rounded-br-none'
                                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                                                    } rounded-lg px-4 py-2`}
                                                >
                                                    <p className='text-sm'>{message.message}</p>
                                                    <p className={`text-xs mt-1 ${isCoach ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>
                                                        {message.time}
                                                    </p>
                                                    {/* <div
                                                        className={`absolute -bottom-[4px] right-0 w-0 h-0 border-t-[5px] border-t-indigo-600 border-l-[15px] border-l-transparent`}
                                                    /> */}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
                                <div className='flex items-center space-x-2'>
                                    <Button variant='outline' size='sm' icon={<Image size={16} />} />
                                    <Button variant='outline' size='sm' icon={<Paperclip size={16} />} />
                                    <input
                                        type='text'
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder='Type a message...'
                                        className='flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                    />
                                    <Button variant='primary' size='sm' icon={<Send size={16} />} onClick={handleSendMessage} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='flex-1 flex items-center justify-center'>
                            <div className='text-center'>
                                <MessageSquare size={48} className='mx-auto text-gray-400' />
                                <p className='mt-2 text-gray-500 dark:text-gray-400'>Select a conversation to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Mock data with separate messages for each client
const clients: Client[] = [
    {
        id: '1',
        name: 'Emma Thompson',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        lastMessage: 'Thank you for the session today!',
        time: '10:30 AM',
        unread: 2,
        online: true,
        messages: [
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
        ],
    },
    {
        id: '2',
        name: 'Robert Chen',
        image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
        lastMessage: 'Looking forward to our next meeting',
        time: 'Yesterday',
        unread: 0,
        online: false,
        messages: [
            {
                id: 1,
                sender: 'client',
                message: 'Hi, I have some questions about the strategic planning framework.',
                time: 'Yesterday',
            },
            {
                id: 2,
                sender: 'coach',
                message: 'Sure, what would you like to know?',
                time: 'Yesterday',
            },
            {
                id: 3,
                sender: 'client',
                message: 'Looking forward to our next meeting',
                time: 'Yesterday',
            },
        ],
    },
    {
        id: '3',
        name: 'Sarah Wilson',
        image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        lastMessage: 'The workshop was really helpful',
        time: 'Yesterday',
        unread: 0,
        online: true,
        messages: [
            {
                id: 1,
                sender: 'client',
                message: 'I attended the workshop yesterday',
                time: 'Yesterday',
            },
            {
                id: 2,
                sender: 'coach',
                message: 'Great! How did you find it?',
                time: 'Yesterday',
            },
            {
                id: 3,
                sender: 'client',
                message: 'The workshop was really helpful',
                time: 'Yesterday',
            },
        ],
    },
];

export default CoachMessages;
