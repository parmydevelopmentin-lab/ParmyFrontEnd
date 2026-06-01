import React from 'react';

const HomePageTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Parmy Technologies
        </h1>
        <p className="text-xl text-center text-gray-300">
          Test page to check if basic routing works
        </p>
      </div>
    </div>
  );
};

export default HomePageTest;
