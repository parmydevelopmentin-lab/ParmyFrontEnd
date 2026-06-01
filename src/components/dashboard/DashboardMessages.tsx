import React from 'react';
import { UserIcon, MessageSquareIcon, PlusIcon } from 'lucide-react';
const DashboardMessages = () => {
  const conversations = [{
    id: 1,
    person: 'Alex Johnson',
    role: 'Project Manager',
    lastMessage: 'Can we schedule a meeting to discuss the project timeline?',
    timestamp: '10:30 AM',
    unread: true,
    avatar: null
  }, {
    id: 2,
    person: 'Sarah Williams',
    role: 'Client',
    lastMessage: 'I really like the new design proposals you sent over.',
    timestamp: 'Yesterday',
    unread: false,
    avatar: null
  }, {
    id: 3,
    person: 'Michael Chen',
    role: 'Developer',
    lastMessage: 'I have completed the backend integration. Ready for testing. The timestamp is Yesterday.',
    unread: false,
    avatar: null
  }, {
    id: 4,
    person: 'Emily Davis',
    role: 'Designer',
    lastMessage: 'Here are the updated mockups for the landing page.',
    timestamp: 'Monday',
    unread: false,
    avatar: null
  }, {
    id: 5,
    person: 'Robert Smith',
    role: 'Client',
    lastMessage: 'When can we expect the first phase to be completed?',
    timestamp: 'Monday',
    unread: true,
    avatar: null
  }];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
        <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Message
        </button>
      </div>
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {conversations.map(conversation => <li key={conversation.id} className={`${conversation.unread ? 'bg-blue-50' : ''} hover:bg-gray-50`}>
              <div className="px-4 py-4 flex items-center sm:px-6 cursor-pointer">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    {conversation.avatar ? <img className="h-12 w-12 rounded-full" src={conversation.avatar} alt="" /> : <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <UserIcon className="h-6 w-6" />
                      </div>}
                  </div>
                  <div className="min-w-0 flex-1 px-4">
                    <div>
                      <div className="flex items-center">
                        <p className={`text-sm font-medium ${conversation.unread ? 'text-blue-600' : 'text-gray-900'}`}>
                          {conversation.person}
                        </p>
                        {conversation.unread && <div className="ml-2 flex-shrink-0">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                          </div>}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.role}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className={`text-sm truncate ${conversation.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <p className="text-sm text-gray-500">
                    {conversation.timestamp}
                  </p>
                </div>
              </div>
            </li>)}
        </ul>
      </div>
      {/* Empty state for message display */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="h-96 flex flex-col items-center justify-center text-gray-400">
          <MessageSquareIcon className="h-12 w-12 mb-4" />
          <p className="text-lg">Select a conversation to view messages</p>
          <p className="text-sm mt-2">Or start a new conversation</p>
        </div>
      </div>
    </div>;
};
export default DashboardMessages;