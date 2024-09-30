import React, { useState } from 'react';
import { X } from 'lucide-react';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';  // Adjust the path based on your project structure

const CreateOrder = ({ onClose, userId, onOrderCreated }) => {
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState({
    service: '',
    academicLevel: '',
    subject: '',
    deadline: '',
    paperType: '',
    paperVolume: '',
    spacing: '',
    sources: '',
    citationStyle: '',
    title: '',
    instructions: '',
    files: [],
  });

  const [confirmation, setConfirmation] = useState('');

  const updateOrder = (field, value) => {
    setOrder({ ...order, [field]: value });
  };

  const getNextOrderNumber = async () => {
    const counterDocRef = doc(db, 'counters', 'orders');
    const counterSnap = await getDoc(counterDocRef);

    if (counterSnap.exists()) {
      const currentNumber = counterSnap.data().lastOrderNumber;
      const nextOrderNumber = currentNumber + 1;

      // Update the lastOrderNumber in Firestore
      await updateDoc(counterDocRef, { lastOrderNumber: nextOrderNumber });

      return nextOrderNumber;
    } else {
      // If the document doesn't exist, create it and start from 1
      await setDoc(counterDocRef, { lastOrderNumber: 1 });
      return 1;
    }
  };

  const submitOrder = async () => {
    if (!userId) {
      setConfirmation('Error: No authenticated user found.');
      return;
    }

    try {
      const orderNumber = await getNextOrderNumber();  // Get the next sequential order number

      const newOrder = {
        ...order,
        orderNumber,  // Add the sequential order number to the new order
        clientId: userId,
        status: 'In Progress',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), newOrder);

      setConfirmation('Order successfully created!');

      if (onOrderCreated) onOrderCreated(newOrder);

      onClose();
    } catch (error) {
      console.error('Error submitting order:', error);
      setConfirmation('Error: Order submission failed.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Service</h2>
            {['Writing', 'Rewriting', 'Editing'].map((service) => (
              <button
                key={service}
                className={`w-full p-3 text-left rounded-lg border ${
                  order.service === service ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onClick={() => updateOrder('service', service)}
              >
                {service}
              </button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Academic Details</h2>
            <select
              className="w-full p-2 border rounded"
              value={order.academicLevel || ''}  // Ensure controlled input
              onChange={(e) => updateOrder('academicLevel', e.target.value)}
            >
              <option value="">Select Academic Level</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-2 border rounded"
              value={order.subject || ''}  // Ensure controlled input
              onChange={(e) => updateOrder('subject', e.target.value)}
            />
            <input
              type="text"
              placeholder="Deadline"
              className="w-full p-2 border rounded"
              value={order.deadline || ''}  // Ensure controlled input
              onChange={(e) => updateOrder('deadline', e.target.value)}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Paper Specifications</h2>
            <select
              className="w-full p-2 border rounded"
              value={order.paperType || ''}  // Ensure controlled input
              onChange={(e) => updateOrder('paperType', e.target.value)}
            >
              <option value="">Select Paper Type</option>
              <option value="Thesis">Thesis</option>
              <option value="Critical Thinking">Critical Thinking</option>
              <option value="Dissertation">Dissertation</option>
              <option value="Article">Article</option>
              <option value="Blog">Blog</option>
              <option value="Book Report">Book Report</option>
              <option value="Case Study">Case Study</option>
              <option value="Presentation">Presentation</option>
              <option value="Research Paper">Research Paper</option>
              <option value="Coursework">Coursework</option>
            </select>

            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Pages"
                className="w-1/2 p-2 border rounded"
                value={order.paperVolume || ''}  // Ensure controlled input
                onChange={(e) => updateOrder('paperVolume', e.target.value)}
              />
              <select
                className="w-1/2 p-2 border rounded"
                value={order.spacing || ''}  // Ensure controlled input
                onChange={(e) => updateOrder('spacing', e.target.value)}
              >
                <option value="">Select Spacing</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
              </select>
            </div>
            <input
              type="number"
              placeholder="Number of Sources"
              className="w-full p-2 border rounded"
              value={order.sources || ''}  // Ensure controlled input
              onChange={(e) => updateOrder('sources', e.target.value)}
            />
            <select
              className="w-full p-2 border rounded"
              value={order.citationStyle || ''}  // Ensure controlled input
              onChange={(e) => updateOrder('citationStyle', e.target.value)}
            >
              <option value="">Select Citation Style</option>
              <option value="MLA">MLA</option>
              <option value="APA">APA</option>
              <option value="Chicago">Chicago</option>
              <option value="Harvard">Harvard</option>
            </select>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order Details</h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border rounded"
              value={order.title || ''}  // Ensure controlled input
              onChange={(e) => updateOrder('title', e.target.value)}
            />
            <textarea
              placeholder="Additional Instructions"
              className="w-full p-2 border rounded h-32"
              value={order.instructions || ''}  // Ensure controlled input
              onChange={(e) => updateOrder('instructions', e.target.value)}
            />
            <input
              type="file"
              multiple
              onChange={(e) => updateOrder('files', Array.from(e.target.files))}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create Order</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        {confirmation && <p className="text-green-600 mb-4">{confirmation}</p>}
        <div className="flex mb-6">
          {['Service', 'General', 'Specifications', 'Details'].map((stepName, index) => (
            <div
              key={stepName}
              className={`flex-1 text-center ${index + 1 === step ? 'text-blue-500 font-semibold' : index + 1 < step ? 'text-green-500' : 'text-gray-400'}`}
            >
              {stepName}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">{renderStep()}</div>
        </div>
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded" onClick={() => setStep(step - 1)}>
              Previous
            </button>
          )}
          {step < 4 ? (
            <button className="px-4 py-2 bg-blue-500 text-white rounded ml-auto" onClick={() => setStep(step + 1)}>
              Next
            </button>
          ) : (
            <button className="px-4 py-2 bg-green-500 text-white rounded ml-auto" onClick={submitOrder}>
              Submit Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
