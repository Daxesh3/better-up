import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/shared/Button';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await login(email, password);
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>Welcome back</h2>
            <p className='text-gray-600 dark:text-gray-400 mb-8'>Sign in to access your CoachAI platform</p>

            <div className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-200 dark:border-gray-700'>
                {error && (
                    <div className='mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-5'>
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                            Email
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Mail size={18} className='text-gray-400' />
                            </div>
                            <input
                                id='email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                placeholder='you@example.com'
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className='flex items-center justify-between mb-1'>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                Password
                            </label>
                            <Link
                                to='/forgot-password'
                                className='text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300'
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock size={18} className='text-gray-400' />
                            </div>
                            <input
                                id='password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                placeholder='••••••••'
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <Button type='submit' variant='primary' isLoading={loading} fullWidth className='py-2.5'>
                            Sign in
                        </Button>
                    </div>
                </form>

                <div className='mt-6 text-center'>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                        Don't have an account?{' '}
                        <Link
                            to='/register'
                            className='font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300'
                        >
                            Register now
                        </Link>
                    </p>
                </div>

                <div className='mt-6 pt-5 border-t border-gray-200 dark:border-gray-700'>
                    <div className='text-center'>
                        <p className='text-xs text-gray-500 dark:text-gray-400 mb-3'>Demo Credentials:</p>
                        <div className='grid grid-cols-2 gap-3'>
                            <div className='border border-gray-200 dark:border-gray-600 rounded-lg p-2'>
                                <p className='text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>Coach</p>
                                <p className='text-xs text-gray-500 dark:text-gray-400'>coach@example.com</p>
                                <p className='text-xs text-gray-500 dark:text-gray-400'>password123</p>
                            </div>
                            <div className='border border-gray-200 dark:border-gray-600 rounded-lg p-2'>
                                <p className='text-xs font-medium text-gray-700 dark:text-gray-300 mb-1'>Client</p>
                                <p className='text-xs text-gray-500 dark:text-gray-400'>client@example.com</p>
                                <p className='text-xs text-gray-500 dark:text-gray-400'>password123</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
