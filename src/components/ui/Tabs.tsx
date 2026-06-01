import React from 'react';
type TabProps = {
  tabs: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills' | 'contained';
  size?: 'sm' | 'md' | 'lg';
};
const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline',
  size = 'md'
}: TabProps) => {
  const getTabClasses = (tabId: string) => {
    const isActive = tabId === activeTab;
    const baseClasses = 'font-medium transition-all duration-200';
    // Size classes
    const sizeClasses = {
      sm: 'text-sm py-2 px-3',
      md: 'text-base py-3 px-4',
      lg: 'text-lg py-4 px-6'
    };
    // Variant-specific classes
    if (variant === 'underline') {
      return `${baseClasses} ${sizeClasses[size]} border-b-2 ${isActive ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`;
    }
    if (variant === 'pills') {
      return `${baseClasses} ${sizeClasses[size]} rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`;
    }
    if (variant === 'contained') {
      return `${baseClasses} ${sizeClasses[size]} ${isActive ? 'bg-white shadow text-green-600 rounded-t-lg' : 'bg-gray-100 text-gray-500 hover:text-gray-700 rounded-t-lg'}`;
    }
    return baseClasses;
  };
  return <div className="border-b border-gray-200">
      <nav className={`flex ${variant === 'pills' ? 'space-x-2' : '-mb-px'}`}>
        {tabs.map(tab => <button key={tab.id} className={getTabClasses(tab.id)} onClick={() => onChange(tab.id)}>
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>)}
      </nav>
    </div>;
};
export default Tabs;