import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Session {
    id: string;
    title: string;
    clientName: string;
    startTime: string;
    endTime: string;
    type: 'one-on-one' | 'workshop';
}

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Mock data - replace with actual data from your backend
    const sessions: Session[] = [
        {
            id: '1',
            title: 'Strategy Session',
            clientName: 'John Doe',
            startTime: '10:00',
            endTime: '11:00',
            type: 'one-on-one',
        },
        {
            id: '2',
            title: 'Team Workshop',
            clientName: 'Jane Smith',
            startTime: '14:00',
            endTime: '16:00',
            type: 'workshop',
        },
    ];

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
    };

    const renderCalendarDays = () => {
        const days = [];
        const totalDays = 42; // 6 rows of 7 days

        for (let i = 0; i < totalDays; i++) {
            const dayNumber = i - firstDayOfMonth + 1;
            const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
            const isSelected =
                selectedDate &&
                selectedDate.getDate() === dayNumber &&
                selectedDate.getMonth() === currentDate.getMonth() &&
                selectedDate.getFullYear() === currentDate.getFullYear();

            days.push(
                <div
                    key={i}
                    className={`p-2 h-24 border border-gray-200 ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'} ${
                        isSelected ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => isCurrentMonth && handleDateClick(dayNumber)}
                >
                    {isCurrentMonth && (
                        <div className='flex flex-col h-full'>
                            <span className='text-sm font-medium text-gray-900'>{dayNumber}</span>
                            <div className='flex-1 overflow-y-auto mt-1'>
                                {sessions.map((session) => (
                                    <div key={session.id} className='text-xs p-1 mb-1 rounded bg-blue-100 text-blue-800 truncate'>
                                        {session.startTime} - {session.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        return days;
    };

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-3xl font-bold text-gray-900'>Calendar</h1>
                    <button
                        className='flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700'
                        onClick={() => console.log('New session')}
                    >
                        <Plus className='h-5 w-5' />
                        <span>New Session</span>
                    </button>
                </div>

                <div className='bg-white rounded-lg shadow-md p-6'>
                    <div className='flex justify-between items-center mb-6'>
                        <div className='flex items-center space-x-4'>
                            <button onClick={handlePrevMonth} className='p-2 hover:bg-gray-100 rounded-full'>
                                <ChevronLeft className='h-6 w-6 text-gray-600' />
                            </button>
                            <h2 className='text-xl font-semibold text-gray-900'>
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h2>
                            <button onClick={handleNextMonth} className='p-2 hover:bg-gray-100 rounded-full'>
                                <ChevronRight className='h-6 w-6 text-gray-600' />
                            </button>
                        </div>
                    </div>

                    <div className='grid grid-cols-7 gap-px bg-gray-200'>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className='bg-gray-50 p-2 text-center text-sm font-medium text-gray-900'>
                                {day}
                            </div>
                        ))}
                        {renderCalendarDays()}
                    </div>
                </div>

                {/* Selected Date Details */}
                {selectedDate && (
                    <div className='mt-6 bg-white rounded-lg shadow-md p-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Sessions for {selectedDate.toLocaleDateString()}</h3>
                        <div className='space-y-4'>
                            {sessions.map((session) => (
                                <div key={session.id} className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                                    <div>
                                        <h4 className='font-medium text-gray-900'>{session.title}</h4>
                                        <p className='text-sm text-gray-500'>{session.clientName}</p>
                                    </div>
                                    <div className='text-right'>
                                        <p className='text-sm font-medium text-gray-900'>
                                            {session.startTime} - {session.endTime}
                                        </p>
                                        <span className='px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800'>
                                            {session.type === 'one-on-one' ? 'One-on-One' : 'Workshop'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendar;
