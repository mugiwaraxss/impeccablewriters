import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';

const OrderDetails = ({ order, onBack }) => {
  const DetailItem = ({ label, value }) => (
    <div className="mb-4 bg-gray-50 rounded-lg p-3 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
      <button 
        className="mb-6 text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Orders
      </button>
      
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Order Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DetailItem label="Title" value={order.title} />
        <DetailItem label="Status" value={
          <span className={`px-2 py-1 rounded-full text-sm font-medium
            ${order.status === 'Complete' ? 'bg-green-100 text-green-800' : 
              order.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'}`}>
            {order.status}
          </span>
        } />
        <DetailItem label="Service" value={order.service} />
        <DetailItem label="Academic Level" value={order.academicLevel} />
        <DetailItem label="Subject" value={order.subject} />
        <DetailItem label="Deadline" value={order.deadline} />
        <DetailItem label="Paper Type" value={order.paperType} />
        <DetailItem label="Word Count" value={order.paperVolume} />
        <DetailItem label="Spacing" value={order.spacing} />
        <DetailItem label="Sources" value={order.sources} />
        <DetailItem label="Citation Style" value={order.citationStyle} />
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Instructions</h3>
        <p className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap">{order.instructions}</p>
      </div>

      {order.files && order.files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Attached Files</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {order.files.map((file, index) => (
              <div key={index} className="flex items-center mb-2 last:mb-0">
                <FileText className="mr-2 text-blue-500" size={20} />
                <p className="text-gray-700">{file.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;