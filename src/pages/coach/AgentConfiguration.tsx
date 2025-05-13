import React from 'react';
import { 
  Brain,
  Settings,
  MessageSquare,
  Save,
  Play,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const AgentConfiguration: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">AI Agent Configuration</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your AI coaching assistant's behavior and responses
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={<Play size={18} />}>
            Test Agent
          </Button>
          <Button variant="primary" icon={<Save size={18} />}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personality Settings */}
          <Card>
            <CardHeader
              title="Agent Personality"
              subtitle="Define how your AI assistant interacts"
              icon={<Brain size={18} />}
            />
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Communication Style
                </label>
                <select className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="professional">Professional & Formal</option>
                  <option value="friendly">Friendly & Approachable</option>
                  <option value="direct">Direct & Concise</option>
                  <option value="motivational">Motivational & Encouraging</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Knowledge Base Focus
                </label>
                <div className="space-y-2">
                  {['Leadership Development', 'Strategic Planning', 'Communication Skills', 'Change Management'].map((area) => (
                    <label key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{area}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Response Length
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    defaultValue="3"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Balanced</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interaction Rules */}
          <Card>
            <CardHeader
              title="Interaction Rules"
              subtitle="Set boundaries and guidelines"
              icon={<Settings size={18} />}
            />
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Response Triggers
                </label>
                <textarea
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Define keywords or phrases that trigger specific responses..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Escalation Criteria
                </label>
                <div className="space-y-2">
                  {[
                    'Detect emotional distress',
                    'Complex technical questions',
                    'Requests for personal advice',
                    'Compliance-related topics'
                  ].map((criterion) => (
                    <label key={criterion} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{criterion}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader
              title="Live Preview"
              subtitle="Test your agent's responses"
              icon={<MessageSquare size={18} />}
            />
            <CardContent className="h-96 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <MessageSquare size={16} className="text-gray-500 dark:text-gray-400" />
                    </div>
                  
                  </div>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Hello! How can I assist you with your coaching goals today?
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Type a message to test..."
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Play size={16} />
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardContent>
              <div className="flex items-start space-x-3 text-sm">
                <div className="flex-shrink-0">
                  <AlertCircle size={16} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    Configuration Tips
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Be specific with knowledge areas</li>
                    <li>Test responses with various scenarios</li>
                    <li>Regular updates improve accuracy</li>
                    <li>Monitor and adjust based on feedback</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentConfiguration;