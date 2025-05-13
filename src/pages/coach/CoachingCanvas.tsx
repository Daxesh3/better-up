import React, { useState } from 'react';
import { 
  Layout, 
  Plus, 
  Save,
  Share,
  FileText,
  Grid,
  List
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const CoachingCanvas: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock canvas templates
  const templates = [
    {
      id: 1,
      title: 'Leadership Development',
      description: 'Framework for developing leadership capabilities',
      lastModified: '2024-03-10',
      status: 'published',
      clients: 5
    },
    {
      id: 2,
      title: 'Goal Setting Workshop',
      description: 'SMART goals and action planning template',
      lastModified: '2024-03-08',
      status: 'draft',
      clients: 0
    },
    {
      id: 3,
      title: 'Executive Presence',
      description: 'Assessment and development framework',
      lastModified: '2024-03-05',
      status: 'published',
      clients: 3
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Coaching Canvas</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Design and manage your coaching frameworks
          </p>
        </div>
        <Button variant="primary" icon={<Plus size={18} />}>
          New Canvas
        </Button>
      </div>

      <Card>
        <CardHeader
          title="Canvas Templates"
          subtitle="Your coaching frameworks and assessments"
          icon={<Layout size={18} />}
          action={
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                icon={<Grid size={16} />}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                icon={<List size={16} />}
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          }
        />
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map(template => (
                <div
                  key={template.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {template.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {template.description}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      template.status === 'published'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                    }`}>
                      {template.status}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Last modified: {new Date(template.lastModified).toLocaleDateString()}</span>
                    <span>{template.clients} clients</span>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" icon={<FileText size={16} />} fullWidth>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" icon={<Share size={16} />} fullWidth>
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {templates.map(template => (
                <div
                  key={template.id}
                  className="py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {template.title}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        template.status === 'published'
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                      }`}>
                        {template.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {template.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>Modified: {new Date(template.lastModified).toLocaleDateString()}</span>
                      <span>{template.clients} clients</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" icon={<FileText size={16} />}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" icon={<Share size={16} />}>
                      Share
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CoachingCanvas;