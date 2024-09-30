import React, { useState, useEffect } from 'react';
import getCountries from 'react-select-country-list';
import { User, Phone, Mail, Lock, Plus } from 'lucide-react';
import { auth } from '../../firebase';  // Assuming you are using Firebase for authentication

const countries = getCountries().getData();

const Settings = () => {
  // Get current user from Firebase Auth
  const currentUser = auth.currentUser;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [communicationChannel, setCommunicationChannel] = useState('email');
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [secondaryPhones, setSecondaryPhones] = useState(['']);
  const [primaryEmail, setPrimaryEmail] = useState(currentUser ? currentUser.email : '');
  const [secondaryEmails, setSecondaryEmails] = useState(['']);
  const [newPassword, setNewPassword] = useState('');

  // Automatically populate the current user's email
  useEffect(() => {
    if (currentUser) {
      setPrimaryEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleAddSecondaryPhone = () => setSecondaryPhones([...secondaryPhones, '']);
  const handleAddSecondaryEmail = () => setSecondaryEmails([...secondaryEmails, '']);

  const handleSaveSettings = () => {
    console.log('Settings saved:', {
      firstName, lastName, country, communicationChannel,
      primaryPhone, secondaryPhones, primaryEmail, secondaryEmails, newPassword,
    });
    // Add your save logic here (e.g., save to Firestore)
  };

  const InputField = ({ icon: Icon, placeholder, value, onChange, type = "text", readOnly = false }) => (
    <div className="relative mb-4">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${readOnly ? 'bg-gray-100' : ''}`}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );

  const Section = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">User Settings</h2>

      {/* General Information Section */}
      <Section title="General Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField icon={User} placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <InputField icon={User} placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <select
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>{country.label}</option>
          ))}
        </select>
        <div className="flex items-center mb-4">
          <span className="mr-2 text-gray-700">Preferred Communication:</span>
          <select
            className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={communicationChannel}
            onChange={(e) => setCommunicationChannel(e.target.value)}
          >
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="messageboard">Message Board</option>
          </select>
        </div>
      </Section>

      {/* Phone Numbers Section */}
      <Section title="Phone Numbers">
        <InputField icon={Phone} placeholder="Primary Phone Number" value={primaryPhone} onChange={(e) => setPrimaryPhone(e.target.value)} />
        {secondaryPhones.map((phone, index) => (
          <InputField
            key={index}
            icon={Phone}
            placeholder="Secondary Phone Number"
            value={phone}
            onChange={(e) => {
              const updatedPhones = [...secondaryPhones];
              updatedPhones[index] = e.target.value;
              setSecondaryPhones(updatedPhones);
            }}
          />
        ))}
        <button
          className="text-blue-500 hover:text-blue-600 transition-colors flex items-center"
          onClick={handleAddSecondaryPhone}
        >
          <Plus size={16} className="mr-1" /> Add Secondary Phone
        </button>
      </Section>

      {/* Email Section */}
      <Section title="Email Addresses">
        <InputField icon={Mail} placeholder="Primary Email" value={primaryEmail} readOnly />
        {secondaryEmails.map((email, index) => (
          <InputField
            key={index}
            icon={Mail}
            placeholder="Secondary Email"
            value={email}
            onChange={(e) => {
              const updatedEmails = [...secondaryEmails];
              updatedEmails[index] = e.target.value;
              setSecondaryEmails(updatedEmails);
            }}
          />
        ))}
        <button
          className="text-blue-500 hover:text-blue-600 transition-colors flex items-center"
          onClick={handleAddSecondaryEmail}
        >
          <Plus size={16} className="mr-1" /> Add Secondary Email
        </button>
      </Section>

      {/* Change Password Section */}
      <Section title="Change Password">
        <InputField icon={Lock} placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" />
      </Section>

      <button
        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors font-medium"
        onClick={handleSaveSettings}
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
