import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw, Ticket, DollarSign, User, Plus, LogOut, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MyOrders from '../components/Dashboard/MyOrders';
import Revisions from '../components/Dashboard/Revisions';
import Tickets from '../components/Dashboard/Tickets';
import Payments from '../components/Dashboard/Payments';
import Settings from '../components/Dashboard/Settings';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import CreateOrder from '../components/CreateOrder';

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    className={`flex items-center w-full p-4 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-blue-200 text-blue-800 shadow-md' 
        : 'text-blue-600 hover:bg-blue-100 hover:text-blue-700'
    }`}
    onClick={onClick}
  >
    <Icon className={`h-5 w-5 mr-3 ${isActive ? 'animate-pulse' : ''}`} />
    <span className="font-medium">{label}</span>
  </button>
);

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('My Orders');
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'My Orders':
        return <MyOrders userId={userId} />;
      case 'Revisions':
        return <Revisions userId={userId} />;
      case 'Tickets':
        return <Tickets userId={userId} />;
      case 'Payments':
        return <Payments userId={userId} />;
      case 'Settings':
        return <Settings userId={userId} />;
      default:
        return <p>Select an option</p>;
    }
  };

  const sidebarItems = [
    { name: 'My Orders', icon: FileText },
    { name: 'Revisions', icon: RefreshCw },
    { name: 'Tickets', icon: Ticket },
    { name: 'Payments', icon: DollarSign },
    { name: 'Settings', icon: User },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Access Denied</h2>
          <p className="text-blue-600 mb-4">Please log in to view your dashboard.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-800">Impeccable Writers</h1>
        </div>
        <nav className="mt-6 px-4">
          {sidebarItems.map(({ name, icon }) => (
            <SidebarItem
              key={name}
              icon={icon}
              label={name}
              isActive={activeTab === name}
              onClick={() => setActiveTab(name)}
            />
          ))}
        </nav>
        <div className="mt-auto p-4">
          <button 
            className="flex items-center w-full p-4 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <button 
                className="mr-4 text-blue-600 hover:text-blue-700 focus:outline-none"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-2xl font-bold text-blue-800">{activeTab}</h2>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => setShowCreateOrder(true)}
              >
                <Plus className="h-5 w-5 mr-2" />
                <span>Create Order</span>
              </button>
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors">
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-blue-50">
          <div className="bg-white rounded-lg shadow-md p-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Create Order Modal */}
      {showCreateOrder && (
        <CreateOrder onClose={() => setShowCreateOrder(false)} userId={userId} />
      )}
    </div>
  );
};

export default Dashboard;