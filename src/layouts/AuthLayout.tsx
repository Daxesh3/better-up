import React from 'react';
import { Outlet } from 'react-router-dom';
import { Brain } from 'lucide-react';

const AuthLayout: React.FC = () => {
    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            {/* Left side branding panel */}
            <div className='hidden md:flex md:w-1/2 bg-[#481bbb] text-white flex-col justify-center items-center p-8'>
                <div className='max-w-md text-center'>
                    <div className='mb-6 flex justify-center'>
                        <div className='h-20 w-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm'>
                            <Brain className='h-12 w-12 text-indigo-300' />
                        </div>
                    </div>
                    <h1 className='text-4xl font-bold mb-4'>CoachAI Platform</h1>
                    <p className='text-xl text-indigo-200 mb-8'>Elevate your coaching practice with our Human + AI augmentation platform</p>
                    <div className='space-y-6'>
                        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                            <h3 className='font-semibold text-lg mb-2'>Personalized Client Journeys</h3>
                            <p className='text-indigo-200'>Design and track bespoke coaching experiences for each client</p>
                        </div>
                        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                            <h3 className='font-semibold text-lg mb-2'>AI-Enhanced Coaching</h3>
                            <p className='text-indigo-200'>Let AI handle routine tasks while you focus on high-impact coaching</p>
                        </div>
                        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
                            <h3 className='font-semibold text-lg mb-2'>Executive-Level Experience</h3>
                            <p className='text-indigo-200'>Provide clients with a premium digital coaching environment</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side auth forms */}
            <div className='flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-50'>
                <div className='w-full max-w-md'>
                    <div className='md:hidden flex items-center justify-center mb-8'>
                        <div className='h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center'>
                            <Brain className='h-10 w-10 text-indigo-700' />
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
