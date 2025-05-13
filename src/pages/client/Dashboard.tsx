import React from 'react';
import { 
  Calendar, 
  MessageSquare, 
  CheckSquare,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import { useAuth } from '../../contexts/AuthContext';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Progress data for chart visualization
  const progressData = [25, 40, 65, 75, 90];
  const goalProgress = 75;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome back, {user?.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your coaching progress and upcoming sessions
        </p>
      </div>
      
      {/* Next Session Card */}
      <Card className="border border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Your Next Coaching Session</h2>
              <p className="text-indigo-700 dark:text-indigo-300 mb-2">Today at 2:00 PM (45 minutes)</p>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-9 w-9 rounded-full overflow-hidden border-2 border-white dark:border-gray-800">
                  <img 
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" 
                    alt="Coach" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">with Sarah Johnson</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Executive Coach</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="primary" icon={<Calendar size={16} />}>
                Join Session
              </Button>
              <Button variant="outline" icon={<MessageSquare size={16} />}>
                Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Progress & Journey */}
        <div className="md:col-span-8 space-y-6">
          {/* Progress Chart */}
          <Card>
            <CardHeader 
              title="Coaching Progress" 
              subtitle="Your journey over time"
              icon={<TrendingUp size={18} />}
            />
            <CardContent>
              <div className="h-64 w-full">
                <div className="flex h-full items-end space-x-2">
                  {progressData.map((value, index) => (
                    <div key={index} className="relative flex-1 transition-all duration-500">
                      <div 
                        className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-md"
                        style={{ height: `${value}%` }}
                      ></div>
                      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700/50 rounded-t-md -z-10"></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">Jan</span>
                  <span className="text-xs text-gray-500">Feb</span>
                  <span className="text-xs text-gray-500">Mar</span>
                  <span className="text-xs text-gray-500">Apr</span>
                  <span className="text-xs text-gray-500">May</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Goal Progress</h3>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${goalProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Starting Point</span>
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">{goalProgress}%</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Goal</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Materials */}
          <Card>
            <CardHeader 
              title="Coaching Materials" 
              subtitle="Resources shared by your coach"
              icon={<BookOpen size={18} />}
            />
            <CardContent className="px-0 py-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { title: 'Leadership Development Framework', type: 'PDF', date: '2 days ago' },
                  { title: 'Goal Setting Workshop Materials', type: 'Presentation', date: '1 week ago' },
                  { title: 'Executive Presence Assessment', type: 'Assessment', date: '2 weeks ago' },
                ].map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{material.title}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{material.type}</span>
                          <span>•</span>
                          <span>{material.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tasks & Upcoming */}
        <div className="md:col-span-4 space-y-6">
          {/* Action Items */}
          <Card>
            <CardHeader 
              title="Action Items" 
              subtitle="Tasks assigned to you"
              icon={<CheckSquare size={18} />}
            />
            <CardContent className="space-y-4">
              {[
                { name: 'Complete leadership assessment', completed: true },
                { name: 'Prepare discussion points for next session', completed: false },
                { name: 'Review coaching notes', completed: false },
                { name: 'Set SMART goals for Q2', completed: false },
              ].map((task, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className={`h-5 w-5 rounded-md border ${task.completed 
                      ? 'bg-indigo-500 border-indigo-500 dark:bg-indigo-600 dark:border-indigo-600' 
                      : 'border-gray-300 dark:border-gray-600'
                    } flex items-center justify-center`}>
                      {task.completed && (
                        <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm ${
                      task.completed 
                        ? 'text-gray-500 dark:text-gray-400 line-through' 
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {task.name}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" fullWidth>
                View All Tasks
              </Button>
            </CardFooter>
          </Card>
          
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader 
              title="Upcoming Sessions" 
              subtitle="Your scheduled coaching"
              icon={<Calendar size={18} />}
            />
            <CardContent className="space-y-4">
              {[
                { date: 'Today', time: '2:00 PM', duration: '45 min' },
                { date: 'Jun 15', time: '10:00 AM', duration: '60 min' },
                { date: 'Jun 22', time: '2:00 PM', duration: '45 min' },
              ].map((session, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <span className="text-xs font-medium">{session.date.includes('Today') ? 'Today' : session.date.split(' ')[0]}</span>
                      {!session.date.includes('Today') && (
                        <span className="text-sm font-bold">{session.date.split(' ')[1]}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Coaching Session</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{session.time}</span>
                      <span>•</span>
                      <span>{session.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" fullWidth>
                View All Sessions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;