import React from 'react';
import { UserIcon, PlusIcon, MailIcon, PhoneIcon } from 'lucide-react';
const DashboardTeam = () => {
  const teamMembers = [{
    id: 1,
    name: 'John Smith',
    role: 'Software Engineer',
    department: 'Development',
    email: 'john.smith@parmytechnologies.com',
    phone: '+1 (971) 380-6374',
    avatar: null
  }, {
    id: 2,
    name: 'Emily Johnson',
    role: 'UI/UX Designer',
    department: 'Design',
    email: 'emily.johnson@parmytechnologies.com',
    phone: '+1 (555) 234-5678',
    avatar: null
  }, {
    id: 3,
    name: 'Michael Chen',
    role: 'Backend Developer',
    department: 'Development',
    email: 'michael.chen@parmytechnologies.com',
    phone: '+1 (555) 345-6789',
    avatar: null
  }, {
    id: 4,
    name: 'Sarah Williams',
    role: 'Project Manager',
    department: 'Management',
    email: 'sarah.williams@parmytechnologies.com',
    phone: '+1 (555) 456-7890',
    avatar: null
  }, {
    id: 5,
    name: 'David Rodriguez',
    role: 'SEO Specialist',
    department: 'Marketing',
    email: 'david.rodriguez@parmytechnologies.com',
    phone: '+1 (555) 567-8901',
    avatar: null
  }, {
    id: 6,
    name: 'Jessica Lee',
    role: 'Content Strategist',
    department: 'Marketing',
    email: 'jessica.lee@parmytechnologies.com',
    phone: '+1 (555) 678-9012',
    avatar: null
  }];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Team</h1>
        <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Team Member
        </button>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map(member => <div key={member.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {member.avatar ? <img className="h-16 w-16 rounded-full" src={member.avatar} alt="" /> : <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <UserIcon className="h-8 w-8" />
                    </div>}
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500">
                  Department: {member.department}
                </p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MailIcon className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{member.email}</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <PhoneIcon className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{member.phone}</span>
                </div>
              </div>
              <div className="mt-4 flex">
                <button type="button" className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  View Profile
                </button>
                <button type="button" className="ml-2 inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Message
                </button>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};
export default DashboardTeam;