import React from 'react';
import { ArrowLeft, FileText, Calendar, Book, Award, Clock } from 'lucide-react';

const OrderDetails = ({ order, onBack }) => {
  const formatDate = (seconds) => {
    return new Date(seconds * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderDetailItem = (icon, label, value) => (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Order Details</h2>
            <button
              onClick={onBack}
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(100vh-200px)] pr-4">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-lg px-3 py-1 bg-gray-100 rounded-full">
                  {order.orderNumber}
                </span>
                <span className={`text-lg px-3 py-1 rounded-full ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <h3 className="text-xl font-semibold">{order.title}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderDetailItem(<Book size={18} />, "Subject", order.subject)}
                {renderDetailItem(<FileText size={18} />, "Paper Type", order.paperType)}
                {renderDetailItem(<Award size={18} />, "Academic Level", order.academicLevel)}
                {renderDetailItem(<FileText size={18} />, "Citation Style", order.citationStyle)}
                {renderDetailItem(<Clock size={18} />, "Deadline", order.deadline)}
                {renderDetailItem(<FileText size={18} />, "Paper Volume", `${order.paperVolume} pages`)}
                {renderDetailItem(<FileText size={18} />, "Service", order.service)}
                {renderDetailItem(<FileText size={18} />, "Sources", order.sources)}
                {renderDetailItem(<FileText size={18} />, "Spacing", order.spacing)}
                {renderDetailItem(<Calendar size={18} />, "Date Created", formatDate(order.createdAt.seconds))}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Instructions:</h4>
                <p className="bg-gray-100 p-3 rounded-md">{order.instructions}</p>
              </div>

              {order.files && order.files.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Attached Files:</h4>
                  <ul className="list-disc ml-5 space-y-1">
                    {order.files.map((file, index) => (
                      <li key={index}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          <FileText size={16} className="mr-2" />
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;