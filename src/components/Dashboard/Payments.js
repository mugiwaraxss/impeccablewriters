// src/components/Dashboard/Payments.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Adjust based on your path

const Payments = ({ userId }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!userId) return;

      try {
        const paymentsRef = collection(db, 'payments');
        const q = query(paymentsRef, where('clientId', '==', userId));
        const querySnapshot = await getDocs(q);
        const paymentsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPayments(paymentsData);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, [userId]);

  return (
    <div>
      {payments.map((payment) => (
        <div key={payment.id} className="bg-white shadow rounded-lg mb-4 p-4">
          <h3 className="font-semibold text-lg">Payment #{payment.id}</h3>
          <p>Amount: {payment.amount}</p>
          <p>Status: {payment.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Payments;
