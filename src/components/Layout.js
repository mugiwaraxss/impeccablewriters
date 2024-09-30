import React from 'react';
import Navigation from './Navigation'; // Adjust the import path as needed

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;