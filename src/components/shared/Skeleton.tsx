import React from 'react';

interface SkeletonProps {
    type?: 'text' | 'avatar' | 'image' | 'button' | 'card' | 'list-item' | 'message';
    className?: string;
    count?: number;
    width?: string;
    height?: string;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

const Skeleton: React.FC<SkeletonProps> = ({ type = 'text', className = '', count = 1, width, height, rounded = 'md' }) => {
    const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';
    const roundedClasses = {
        none: '',
        sm: 'rounded-sm',
        md: 'rounded',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };

    const getTypeClasses = () => {
        switch (type) {
            case 'text':
                return 'h-4 w-3/4';
            case 'avatar':
                return 'h-12 w-12 rounded-full';
            case 'image':
                return 'h-48 w-full';
            case 'button':
                return 'h-10 w-24';
            case 'card':
                return 'h-64 w-full';
            case 'list-item':
                return 'h-16 w-full';
            case 'message':
                return 'h-20 w-3/4';
            default:
                return 'h-4 w-3/4';
        }
    };

    const renderSkeleton = () => {
        const classes = `${baseClasses} ${getTypeClasses()} ${roundedClasses[rounded]} ${className}`;
        const style = {
            width: width || undefined,
            height: height || undefined,
        };

        return <div className={classes} style={style} />;
    };

    if (count === 1) {
        return renderSkeleton();
    }

    return (
        <div className='space-y-2'>
            {Array.from({ length: count }).map((_, index) => (
                <React.Fragment key={index}>{renderSkeleton()}</React.Fragment>
            ))}
        </div>
    );
};

export default Skeleton;
