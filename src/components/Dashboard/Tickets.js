// src/components/Dashboard/Tickets.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Adjust based on your path

const Tickets = ({ userId }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!userId) return;

      try {
        const ticketsRef = collection(db, 'tickets');
        const q = query(ticketsRef, where('clientId', '==', userId));
        const querySnapshot = await getDocs(q);
        const ticketsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTickets(ticketsData);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, [userId]);

  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-white shadow rounded-lg mb-4 p-4">
          <h3 className="font-semibold text-lg">Ticket #{ticket.id}</h3>
          <p>{ticket.issue}</p>
          <p>Status: {ticket.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
