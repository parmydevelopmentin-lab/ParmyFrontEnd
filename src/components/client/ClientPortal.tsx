import React, { useState } from 'react';
import { UsersIcon, CalendarIcon, FileTextIcon, BarChart3Icon, MessageSquareIcon, BellIcon, ChevronRightIcon, CheckCircleIcon, ClockIcon, ArrowUpRightIcon, UserIcon, DownloadIcon, PlusIcon, ArrowRightIcon } from 'lucide-react';
import Tabs from '../ui/Tabs';
const ClientPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const client = {
    id: 1,
    name: 'FinSecure Holdings',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    industry: 'Financial Services',
    region: 'North America',
    clientSince: '2018',
    activeProjects: 3,
    completedProjects: 15,
    nextMeeting: 'December 15, 2023 • 10:00 AM EST',
    accountManager: {
      name: 'Sarah Johnson',
      title: 'Senior Account Director',
      email: 'sarah.johnson@parmytechnologies.com',
      phone: '+1 (415) 555-1234',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    },
    contacts: [{
      name: 'Michael Reynolds',
      title: 'Chief Technology Officer',
      email: 'm.reynolds@finsecure.com',
      phone: '+1 (212) 555-6789',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    }, {
      name: 'Jennifer Chen',
      title: 'VP of Digital Transformation',
      email: 'j.chen@finsecure.com',
      phone: '+1 (212) 555-4321',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    }]
  };
  const activeProjects = [{
    id: 1,
    name: 'Enterprise Cloud Migration',
    description: 'Migration of on-premises infrastructure to AWS cloud with focus on security and compliance requirements.',
    status: 'In Progress',
    progress: 68,
    startDate: '2023-08-15',
    endDate: '2023-12-31',
    team: [{
      initial: 'JS',
      name: 'John Smith',
      color: 'bg-green-500'
    }, {
      initial: 'AR',
      name: 'Anna Rodriguez',
      color: 'bg-green-600'
    }, {
      initial: 'TK',
      name: 'Tom Kowalski',
      color: 'bg-green-700'
    }],
    nextMilestone: {
      name: 'Database Migration Phase',
      date: '2023-11-30'
    }
  }, {
    id: 2,
    name: 'AI-Powered Risk Assessment Platform',
    description: 'Development of machine learning models to enhance fraud detection and risk assessment capabilities.',
    status: 'In Progress',
    progress: 42,
    startDate: '2023-10-01',
    endDate: '2024-03-31',
    team: [{
      initial: 'EJ',
      name: 'Emily Johnson',
      color: 'bg-green-500'
    }, {
      initial: 'MC',
      name: 'Michael Chen',
      color: 'bg-green-600'
    }],
    nextMilestone: {
      name: 'Model Training Completion',
      date: '2023-12-15'
    }
  }, {
    id: 3,
    name: 'Mobile Banking Security Audit',
    description: 'Comprehensive security assessment of mobile banking applications and infrastructure.',
    status: 'In Progress',
    progress: 85,
    startDate: '2023-09-15',
    endDate: '2023-11-30',
    team: [{
      initial: 'SW',
      name: 'Sarah Williams',
      color: 'bg-green-500'
    }, {
      initial: 'JL',
      name: 'James Lee',
      color: 'bg-green-600'
    }],
    nextMilestone: {
      name: 'Final Report Delivery',
      date: '2023-11-30'
    }
  }];
  const recentDeliverables = [{
    id: 1,
    name: 'Cloud Architecture Blueprint',
    project: 'Enterprise Cloud Migration',
    type: 'Document',
    date: 'November 10, 2023',
    size: '15.4 MB'
  }, {
    id: 2,
    name: 'Security Assessment Report - Q3 2023',
    project: 'Mobile Banking Security Audit',
    type: 'Report',
    date: 'November 5, 2023',
    size: '8.2 MB'
  }, {
    id: 3,
    name: 'AI Model Performance Metrics',
    project: 'AI-Powered Risk Assessment Platform',
    type: 'Dashboard',
    date: 'October 28, 2023',
    size: '4.1 MB'
  }, {
    id: 4,
    name: 'Implementation Roadmap',
    project: 'Enterprise Cloud Migration',
    type: 'Presentation',
    date: 'October 15, 2023',
    size: '22.6 MB'
  }];
  const upcomingMeetings = [{
    id: 1,
    title: 'Weekly Project Status Review',
    project: 'Enterprise Cloud Migration',
    date: 'December 15, 2023',
    time: '10:00 AM - 11:00 AM EST',
    location: 'Virtual (Zoom)',
    participants: [{
      name: 'Sarah Johnson',
      role: 'Account Director'
    }, {
      name: 'John Smith',
      role: 'Project Manager'
    }, {
      name: 'Michael Reynolds',
      role: 'Client CTO'
    }, {
      name: 'Jennifer Chen',
      role: 'Client VP'
    }]
  }, {
    id: 2,
    title: 'AI Model Review Session',
    project: 'AI-Powered Risk Assessment Platform',
    date: 'December 18, 2023',
    time: '2:00 PM - 3:30 PM EST',
    location: 'Virtual (Microsoft Teams)',
    participants: [{
      name: 'Emily Johnson',
      role: 'Data Scientist'
    }, {
      name: 'Michael Chen',
      role: 'ML Engineer'
    }, {
      name: 'Jennifer Chen',
      role: 'Client VP'
    }]
  }, {
    id: 3,
    title: 'Security Audit Findings Presentation',
    project: 'Mobile Banking Security Audit',
    date: 'November 30, 2023',
    time: '11:00 AM - 12:30 PM EST',
    location: 'Client Office - New York',
    participants: [{
      name: 'Sarah Williams',
      role: 'Security Lead'
    }, {
      name: 'James Lee',
      role: 'Security Analyst'
    }, {
      name: 'Sarah Johnson',
      role: 'Account Director'
    }, {
      name: 'Michael Reynolds',
      role: 'Client CTO'
    }]
  }];
  const formatDate = dateString => {
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  const getStatusStyles = status => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'In Progress':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Not Started':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'At Risk':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'On Track':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  const tabs = [{
    id: 'overview',
    label: 'Overview'
  }, {
    id: 'projects',
    label: 'Projects'
  }, {
    id: 'deliverables',
    label: 'Deliverables'
  }, {
    id: 'meetings',
    label: 'Meetings'
  }, {
    id: 'contacts',
    label: 'Contacts'
  }];
  return <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Client Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 text-white">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-lg bg-white p-2 shadow-md mr-4 flex items-center justify-center">
            <img src={client.logo} alt={client.name} className="max-h-full max-w-full rounded" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{client.name}</h2>
            <div className="flex items-center mt-1 text-gray-300">
              <span>{client.industry}</span>
              <span className="mx-2">•</span>
              <span>{client.region}</span>
              <span className="mx-2">•</span>
              <span>Client since {client.clientSince}</span>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-3">
            <button className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2">
              <BellIcon className="h-5 w-5" />
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2">
              <MessageSquareIcon className="h-5 w-5" />
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition-colors">
              Client Dashboard
            </button>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="px-6 pt-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" size="md" />
      </div>
      {/* Content Area */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <BarChart3Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Project Status
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Active
                        </p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {client.activeProjects}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Completed
                        </p>
                        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {client.completedProjects}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Next Meeting
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Scheduled for
                    </p>
                    <p className="text-gray-900 dark:text-gray-300">
                      {client.nextMeeting}
                    </p>
                    <button className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium inline-flex items-center">
                      View Details
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <UsersIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Account Team
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Account Manager
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                          <img src={client.accountManager.image} alt={client.accountManager.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {client.accountManager.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {client.accountManager.title}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium inline-flex items-center">
                      View Team
                      <ChevronRightIcon className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Active Projects */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Active Projects
                </h3>
                <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium inline-flex items-center" onClick={() => setActiveTab('projects')}>
                  View All Projects
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {activeProjects.map(project => <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                            {project.name}
                          </h4>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex -space-x-2 mr-4">
                            {project.team.map((member, index) => <div key={index} className={`h-8 w-8 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800`} title={member.name}>
                                {member.initial}
                              </div>)}
                          </div>
                          <button className="p-1 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                            <ArrowUpRightIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {project.description}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {formatDate(project.startDate)} -{' '}
                            {formatDate(project.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircleIcon className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-1" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Next: {project.nextMilestone.name} (
                            {formatDate(project.nextMilestone.date)})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="text-gray-700 dark:text-gray-300 font-medium">
                          Progress: {project.progress}%
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-600 dark:bg-green-500" style={{
                    width: `${project.progress}%`
                  }}></div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
            {/* Recent Deliverables */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Recent Deliverables
                </h3>
                <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium inline-flex items-center" onClick={() => setActiveTab('deliverables')}>
                  View All Deliverables
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentDeliverables.slice(0, 3).map(deliverable => <li key={deliverable.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <FileTextIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="ml-4">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {deliverable.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {deliverable.project} • {deliverable.date} •{' '}
                              {deliverable.type}
                            </p>
                          </div>
                        </div>
                        <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <DownloadIcon className="h-3.5 w-3.5 mr-1" />
                          Download
                        </button>
                      </div>
                    </li>)}
                </ul>
              </div>
            </div>
            {/* Upcoming Meetings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Upcoming Meetings
                </h3>
                <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium inline-flex items-center" onClick={() => setActiveTab('meetings')}>
                  View All Meetings
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {upcomingMeetings.slice(0, 2).map(meeting => <li key={meeting.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {meeting.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {meeting.project}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {meeting.date} • {meeting.time}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{meeting.location}</span>
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-0 flex items-center">
                          <div className="flex -space-x-1 mr-3">
                            {meeting.participants.slice(0, 3).map((participant, index) => <div key={index} className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 border border-white dark:border-gray-800" title={`${participant.name} (${participant.role})`}>
                                  {participant.name.charAt(0)}
                                </div>)}
                            {meeting.participants.length > 3 && <div className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 border border-white dark:border-gray-800">
                                +{meeting.participants.length - 3}
                              </div>}
                          </div>
                          <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            Details
                          </button>
                        </div>
                      </div>
                    </li>)}
                </ul>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 text-center">
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                    <PlusIcon className="h-4 w-4 mr-1.5" />
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>}
        {/* Projects Tab */}
        {activeTab === 'projects' && <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Client Projects
              </h3>
              <div className="flex space-x-3">
                <select className="text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-gray-300">
                  <option>All Statuses</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
                <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                  <PlusIcon className="h-4 w-4 mr-1.5" />
                  New Project
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    Active Projects ({activeProjects.length})
                  </h4>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {activeProjects.map(project => <li key={project.id} className="px-6 py-5 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                          <div className="flex items-center">
                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                              {project.name}
                            </h4>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {project.description}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <ClockIcon className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {formatDate(project.startDate)} -{' '}
                              {formatDate(project.endDate)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end">
                          <div className="flex items-center mb-2">
                            <div className="flex -space-x-2 mr-2">
                              {project.team.map((member, index) => <div key={index} className={`h-8 w-8 rounded-full ${member.color} flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800`} title={member.name}>
                                  {member.initial}
                                </div>)}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {project.team.length} team members
                            </span>
                          </div>
                          <div className="flex items-center mb-1 text-sm">
                            <span className="text-gray-700 dark:text-gray-300 font-medium mr-2">
                              Progress: {project.progress}%
                            </span>
                          </div>
                          <div className="w-full sm:w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="h-2 rounded-full bg-green-600 dark:bg-green-500" style={{
                        width: `${project.progress}%`
                      }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-3">
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          Documents
                        </button>
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          Timeline
                        </button>
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                          View Project
                        </button>
                      </div>
                    </li>)}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">
                    Completed Projects ({client.completedProjects})
                  </h4>
                </div>
                <div className="p-6 text-center">
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                    View Completed Projects
                    <ArrowRightIcon className="ml-1 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>}
        {/* Other tabs would be implemented similarly */}
        {(activeTab === 'deliverables' || activeTab === 'meetings' || activeTab === 'contacts') && <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              This section is under development
            </p>
            <button onClick={() => setActiveTab('overview')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50">
              Return to Overview
            </button>
          </div>}
      </div>
    </div>;
};
export default ClientPortal;