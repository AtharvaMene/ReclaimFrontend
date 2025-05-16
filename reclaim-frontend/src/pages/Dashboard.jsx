import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome, {user?.name || 'User'}!</h1>
      <p className="mt-4">This is the dashboard.</p>
    </div>
  );
};

export default Dashboard;
