import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserIcon, MailIcon, LockIcon, BellIcon, GlobeIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import Tabs from '../ui/Tabs';
const DashboardSettings = () => {
  const {
    user
  } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const tabs = [{
    id: 'profile',
    label: 'Profile',
    icon: <UserIcon className="h-5 w-5" />
  }, {
    id: 'password',
    label: 'Password',
    icon: <LockIcon className="h-5 w-5" />
  }, {
    id: 'notifications',
    label: 'Notifications',
    icon: <BellIcon className="h-5 w-5" />
  }, {
    id: 'preferences',
    label: 'Preferences',
    icon: <GlobeIcon className="h-5 w-5" />
  }];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      <div className="mt-6 bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="sm:hidden p-4">
            <select id="tabs" name="tabs" className="block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md" value={activeTab} onChange={e => setActiveTab(e.target.value)}>
              {tabs.map(tab => <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>)}
            </select>
          </div>
          <div className="hidden sm:block px-4 pt-2">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" size="md" />
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profile Information
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your account's profile information.
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <UserIcon className="h-12 w-12" />
                  </div>
                </div>
                <div className="ml-5">
                  <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Change Avatar
                  </button>
                  <button type="button" className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Remove
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div className="mt-1">
                    <input type="text" name="first-name" id="first-name" defaultValue={user?.username ? user.username.split(' ')[0] : ''} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div className="mt-1">
                    <input type="text" name="last-name" id="last-name" defaultValue={user?.username ? (user.username.split(' ')[1] || '') : ''} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="email" name="email" type="email" defaultValue={user?.email} className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <div className="mt-1">
                    <textarea id="about" name="about" rows={3} className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md" defaultValue={''} />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Cancel
                </button>
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Save
                </button>
              </div>
            </div>}
          {/* Password Settings */}
          {activeTab === 'password' && <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Update Password
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Ensure your account is using a long, random password to stay
                  secure.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="current-password" name="current-password" type={showCurrentPassword ? 'text' : 'password'} className="pl-10 pr-10 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                        {showCurrentPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="new-password" name="new-password" type={showNewPassword ? 'text' : 'password'} className="pl-10 pr-10 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                        {showNewPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input id="confirm-password" name="confirm-password" type={showNewPassword ? 'text' : 'password'} className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Cancel
                </button>
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Update Password
                </button>
              </div>
            </div>}
          {/* Notifications Settings */}
          {activeTab === 'notifications' && <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Notification Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Manage how we contact you.
                </p>
              </div>
              <div className="space-y-6">
                <fieldset>
                  <legend className="text-base font-medium text-gray-900">
                    By Email
                  </legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="comments" name="comments" type="checkbox" defaultChecked className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="comments" className="font-medium text-gray-700">
                          Project updates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a project is updated or completed.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="candidates" name="candidates" type="checkbox" defaultChecked className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="candidates" className="font-medium text-gray-700">
                          Messages
                        </label>
                        <p className="text-gray-500">
                          Get notified when you receive a new message.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="offers" name="offers" type="checkbox" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="offers" className="font-medium text-gray-700">
                          Marketing
                        </label>
                        <p className="text-gray-500">
                          Get notified about new products, features, and offers.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="text-base font-medium text-gray-900">
                    Push Notifications
                  </legend>
                  <p className="text-sm text-gray-500">
                    These are delivered via SMS to your mobile phone.
                  </p>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input id="push-everything" name="push-notifications" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                      <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                        Everything
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="push-email" name="push-notifications" type="radio" defaultChecked className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                      <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                        Same as email
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="push-nothing" name="push-notifications" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                      <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                        No push notifications
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="flex justify-end">
                <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Cancel
                </button>
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Save
                </button>
              </div>
            </div>}
          {/* Preferences Settings */}
          {activeTab === 'preferences' && <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Preferences
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Customize your experience.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <select id="language" name="language" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" defaultValue="English">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Japanese</option>
                    <option>Chinese</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select id="timezone" name="timezone" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" defaultValue="Pacific Standard Time (PST)">
                    <option>Pacific Standard Time (PST)</option>
                    <option>Mountain Standard Time (MST)</option>
                    <option>Central Standard Time (CST)</option>
                    <option>Eastern Standard Time (EST)</option>
                    <option>Greenwich Mean Time (GMT)</option>
                    <option>Central European Time (CET)</option>
                  </select>
                </div>
                <fieldset>
                  <legend className="text-base font-medium text-gray-900">
                    Theme
                  </legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <input id="theme-system" name="theme" type="radio" defaultChecked className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                      <label htmlFor="theme-system" className="ml-3 block text-sm font-medium text-gray-700">
                        System default
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="theme-light" name="theme" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                      <label htmlFor="theme-light" className="ml-3 block text-sm font-medium text-gray-700">
                        Light
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="theme-dark" name="theme" type="radio" className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300" />
                      <label htmlFor="theme-dark" className="ml-3 block text-sm font-medium text-gray-700">
                        Dark
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="flex justify-end">
                <button type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Cancel
                </button>
                <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Save
                </button>
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default DashboardSettings;