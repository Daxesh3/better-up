import React, { useState } from 'react';
import { Calendar, Clock, Globe, Mail, Phone, User } from 'lucide-react';

interface ClientFormData {
    name: string;
    email: string;
    phone: string;
    website: string;
    description: string;
    startDate: string;
    meetingFrequency: 'weekly' | 'monthly';
    reminderPreference: 'email' | 'sms' | 'both';
}

const AddClientForm: React.FC = () => {
    const [formData, setFormData] = useState<ClientFormData>({
        name: '',
        email: '',
        phone: '',
        website: '',
        description: '',
        startDate: '',
        meetingFrequency: 'weekly',
        reminderPreference: 'email',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement client creation logic
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
            <h2 className='text-2xl font-bold mb-6 text-gray-800'>Add New Client</h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Name Field */}
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                        <div className='relative'>
                            <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
                        <div className='relative'>
                            <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                            <input
                                type='tel'
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>

                    {/* Website Field */}
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Website</label>
                        <div className='relative'>
                            <Globe className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                            <input
                                type='url'
                                name='website'
                                value={formData.website}
                                onChange={handleChange}
                                className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                    </div>

                    {/* Start Date Field */}
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Coaching Start Date</label>
                        <div className='relative'>
                            <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                            <input
                                type='date'
                                name='startDate'
                                value={formData.startDate}
                                onChange={handleChange}
                                className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                            />
                        </div>
                    </div>

                    {/* Meeting Frequency Field */}
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Meeting Frequency</label>
                        <div className='relative'>
                            <Clock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
                            <select
                                name='meetingFrequency'
                                value={formData.meetingFrequency}
                                onChange={handleChange}
                                className='pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option value='weekly'>Weekly</option>
                                <option value='monthly'>Monthly</option>
                            </select>
                        </div>
                    </div>
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
                        placeholder='Enter client description and goals...'
                    />
                </div>

                {/* Reminder Preference */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Reminder Preference</label>
                    <select
                        name='reminderPreference'
                        value={formData.reminderPreference}
                        onChange={handleChange}
                        className='w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value='email'>Email</option>
                        <option value='sms'>SMS</option>
                        <option value='both'>Both</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
                    >
                        Add Client
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClientForm;
