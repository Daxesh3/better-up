import React, { useState, useEffect } from 'react';
import { Card } from '../../components/shared/Card';
import Skeleton from '../../components/shared/Skeleton';

const CalendarSkeleton = () => (
    <div className="space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Skeleton type="button" width="120px" />
                <Skeleton type="text" width="200px" />
            </div>
            <div className="flex items-center space-x-2">
                <Skeleton type="button" width="100px" />
                <Skeleton type="button" width="100px" />
            </div>
        </div>

        {/* Calendar Grid */}
        <Card className="p-6">
            <div className="grid grid-cols-7 gap-4">
                {/* Weekday Headers */}
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="text-center">
                        <Skeleton type="text" width="40px" />
                    </div>
                ))}

                {/* Calendar Days */}
                {Array.from({ length: 35 }).map((_, i) => (
                    <div key={i} className="aspect-square p-2">
                        <div className="h-full space-y-2">
                            <Skeleton type="text" width="30px" />
                            <div className="space-y-1">
                                <Skeleton type="text" width="90%" />
                                <Skeleton type="text" width="80%" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6">
            <div className="space-y-4">
                <Skeleton type="text" width="30%" />
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <Skeleton type="avatar" />
                            <div className="flex-1 space-y-2">
                                <Skeleton type="text" width="75%" />
                                <Skeleton type="text" width="50%" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    </div>
);

const Calendar: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data from server
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <CalendarSkeleton />;
    }

    return (
        // ... existing calendar content ...
    );
};

export default Calendar; 