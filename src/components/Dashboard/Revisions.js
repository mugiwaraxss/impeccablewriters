// src/components/Dashboard/Revisions.js
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';  // Adjust based on your path

const Revisions = ({ userId }) => {
  const [revisions, setRevisions] = useState([]);

  useEffect(() => {
    const fetchRevisions = async () => {
      if (!userId) return;

      try {
        const revisionsRef = collection(db, 'revisions');
        const q = query(revisionsRef, where('clientId', '==', userId));
        const querySnapshot = await getDocs(q);
        const revisionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRevisions(revisionsData);
      } catch (error) {
        console.error('Error fetching revisions:', error);
      }
    };

    fetchRevisions();
  }, [userId]);

  return (
    <div>
      {revisions.map((revision) => (
        <div key={revision.id} className="bg-white shadow rounded-lg mb-4 p-4">
          <h3 className="font-semibold text-lg">Revision #{revision.id}</h3>
          <p>{revision.description}</p>
          <p>Status: {revision.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Revisions;
