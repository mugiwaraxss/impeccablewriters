import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import OrderDetails from './OrderDetails';
import { Search, RefreshCw, Calendar, MoreVertical, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(8);

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    if (!userId) return;
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, where('clientId', '==', userId));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      setOrders(orders.filter((order) => order.id !== orderId));
      console.log('Order successfully deleted');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      (order.title.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.includes(searchTerm)) &&
      (statusFilter === '' || order.status === statusFilter)
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderOrderStatus = (status) => {
    const statusStyles = {
      Unpaid: 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Orders</h2>
        <button onClick={fetchOrders} className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
          <RefreshCw size={18} className="mr-2" />
          Refresh
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by UID, title, type, etc."
            className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        <select
          className="w-full sm:w-auto border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Order status</option>
          <option value="Unpaid">Unpaid</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {currentOrders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow mb-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setSelectedOrder(order)}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <div className="flex items-center mb-2 sm:mb-0">
              <Eye className="text-green-500 mr-2" size={18} />
              {renderOrderStatus(order.status)}
              <span className="ml-2 font-semibold">Order ID: {order.id}</span>
            </div>
            <span className="text-sm text-gray-500">
              <Calendar size={14} className="inline mr-1" />
              Date Added: {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
            </span>
          </div>
          <h3 className="font-semibold text-lg mt-2">{order.title}</h3>
          <p className="text-sm text-gray-600">{order.paperType} · Words: {order.wordCount}</p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
            <span className="text-sm mb-2 sm:mb-0">Urgency: {order.urgency}</span>
            <div className="flex items-center">
              <span className="font-bold text-lg mr-4">${order.price} USD</span>
              {order.status === 'Unpaid' && (
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Pay Now
                </button>
              )}
              <button className="ml-2 text-gray-500 hover:text-gray-700 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {selectedOrder && <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <span className="mb-2 sm:mb-0">Total {filteredOrders.length} item{filteredOrders.length !== 1 ? 's' : ''}</span>
        <div className="flex items-center">
          <button
            className="px-3 py-1 border rounded-l-lg hover:bg-gray-100 transition-colors"
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="px-3 py-1 border-t border-b">{currentPage}</span>
          <button
            className="px-3 py-1 border rounded-r-lg hover:bg-gray-100 transition-colors"
            onClick={() => paginate(currentPage < Math.ceil(filteredOrders.length / ordersPerPage) ? currentPage + 1 : currentPage)}
          >
            <ChevronRight size={18} />
          </button>
          <select
            className="ml-4 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={ordersPerPage}
            onChange={(e) => setOrdersPerPage(Number(e.target.value))}
          >
            <option value={8}>8 / page</option>
            <option value={16}>16 / page</option>
            <option value={32}>32 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;