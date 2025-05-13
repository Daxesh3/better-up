import React from 'react';
import { 
  CheckSquare,
  Calendar,
  Clock,
  AlertCircle,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const ClientTasks: React.FC = () => {
  // Mock data
  const tasks = [
    {
      id: 1,
      title: 'Complete Leadership Assessment',
      description: 'Take the online leadership style assessment',
      dueDate: '2024-03-20',
      priority: 'high',
      status: 'in_progress',
      category: 'assessment'
    },
    {
      id: 2,
      title: 'Prepare Team Meeting Agenda',
      description: 'Apply new communication framework',
      dueDate: '2024-03-18',
      priority: 'medium',
      status: 'todo',
      category: 'implementation'
    },
    {
      id: 3,
      title: 'Document Weekly Wins',
      description: 'Record key achievements and learnings',
      dueDate: '2024-03-17',
      priority: 'low',
      status: 'todo',
      category: 'reflection'
    },
    {
      id: 4,
      title: 'Review Coaching Notes',
      description: 'From last session on March 14',
      dueDate: '2024-03-16',
      priority: 'medium',
      status: 'completed',
      category: 'review'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tasks & Actions</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your coaching assignments and action items
          </p>
        </div>
        <Button variant="outline" icon={<Filter size={18} />}>
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Due Today', count: 2, icon: <Clock size={20} /> },
          { label: 'In Progress', count: 3, icon: <CheckSquare size={20} /> },
          { label: 'Completed', count: 15, icon: <Calendar size={20} /> },
          { label: 'Overdue', count: 1, icon: <AlertCircle size={20} /> }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                    {stat.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.count}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader
          title="Current Tasks"
          subtitle="Your active assignments and action items"
          icon={<CheckSquare size={18} />}
        />
        <CardContent>
          <div className="space-y-4">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border ${
                  task.status === 'completed'
                    ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`h-5 w-5 rounded-md border ${
                        task.status === 'completed'
                          ? 'bg-indigo-500 border-indigo-500 dark:bg-indigo-600 dark:border-indigo-600'
                          : 'border-gray-300 dark:border-gray-600'
                      } flex items-center justify-center cursor-pointer`}
                    >
                      {task.status === 'completed' && (
                        <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${
                        task.status === 'completed'
                          ? 'text-gray-500 dark:text-gray-400 line-through'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {task.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                    
                    <p className={`mt-1 text-sm ${
                      task.status === 'completed'
                        ? 'text-gray-400 dark:text-gray-500'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {task.description}
                    </p>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          {task.category}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" icon={<ChevronRight size={16} />}>
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientTasks;