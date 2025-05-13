import React, { useState } from 'react';
import { Calendar, Clock, Users, Type } from 'lucide-react';

interface SessionFormData {
    title: string;
    clientId: string;
    date: string;
    startTime: string;
    endTime: string;
    type: 'one-on-one' | 'workshop';
    description: string;
    participants?: string[];
}

const NewSessionForm: React.FC = () => {
    const [formData, setFormData] = useState<SessionFormData>({
        title: '',
        clientId: '',
        date: '',
        startTime: '',
        endTime: '',
        type: 'one-on-one',
        description: '',
        participants: [],
    });

    // Mock data - replace with actual data from your backend
    const clients = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Smith' },
        { id: '3', name: 'Mike Johnson' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement session creation logic
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>Schedule New Session</h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Title Field */}
                <div className='relative'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Session Title</label>
                    <div className='relative'>
                        <Type className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                        <input
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>
                </div>

                {/* Client Selection */}
                <div className='relative'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Client</label>
                    <div className='relative'>
                        <Users className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                        <select
                            name='clientId'
                            value={formData.clientId}
                            onChange={handleChange}
                            className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        >
                            <option value=''>Select a client</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Date Field */}
                <div className='relative'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Date</label>
                    <div className='relative'>
                        <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                        <input
                            type='date'
                            name='date'
                            value={formData.date}
                            onChange={handleChange}
                            className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                    </div>
                </div>

                {/* Time Fields */}
                <div className='grid grid-cols-2 gap-4'>
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Start Time</label>
                        <div className='relative'>
                            <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                            <input
                                type='time'
                                name='startTime'
                                value={formData.startTime}
                                onChange={handleChange}
                                className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                    </div>
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>End Time</label>
                        <div className='relative'>
                            <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                            <input
                                type='time'
                                name='endTime'
                                value={formData.endTime}
                                onChange={handleChange}
                                className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Session Type */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Session Type</label>
                    <select
                        name='type'
                        value={formData.type}
                        onChange={handleChange}
                        className='w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value='one-on-one'>One-on-One</option>
                        <option value='workshop'>Workshop</option>
                    </select>
                </div>

                {/* Description Field */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className='w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter session description and objectives...'
                    />
                </div>

                {/* Submit Button */}
                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
                    >
                        Schedule Session
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewSessionForm;
