// src/components/Dashboard/MyOrders.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';  // Adjust based on your path
import OrderDetails from './OrderDetails';  // Order details component

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);  // State for the selected order

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('clientId', '==', userId));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userId]);

  // Function to handle order deletion
  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;

    try {
      // Delete the order from Firestore
      await deleteDoc(doc(db, 'orders', orderId));

      // Update the local state to remove the deleted order
      setOrders(orders.filter((order) => order.id !== orderId));
      console.log('Order successfully deleted');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      {selectedOrder ? (
        // Show order details if an order is selected
        <OrderDetails order={selectedOrder} onBack={() => setSelectedOrder(null)} />
      ) : (
        // Show the list of orders with the sequential order number and title
        <div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow rounded-lg mb-4 p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedOrder(order)}  // Click handler to show details
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>  {/* Display sequential order number */}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">Paper Type: {order.paperType}</p>

              {/* Delete button */}
              <button
                className="mt-2 text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the click event for showing details
                  handleDeleteOrder(order.id);
                }}
              >
                Delete Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
