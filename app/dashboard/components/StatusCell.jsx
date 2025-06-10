"use client";

import { useState, useRef, useEffect } from 'react';
import { PROJECT_STATUS } from '@/lib/constants';

export default function StatusCell({ status, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentStatus = PROJECT_STATUS[status];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-40 px-4 py-2 rounded-md font-medium transition-all duration-200 hover:opacity-90 ${currentStatus.color} ${currentStatus.textColor}`}
      >
        {currentStatus.label}
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200">
          {Object.entries(PROJECT_STATUS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                onChange(key);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-md last:rounded-b-md ${
                key === status ? 'bg-blue-50' : ''
              }`}
            >
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${value.color}`} />
              {value.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}