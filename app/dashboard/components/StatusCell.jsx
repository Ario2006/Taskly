"use client";

import { useState, useRef, useEffect } from 'react';
import { PROJECT_STATUS } from '@/lib/constants';
import { ChevronDown, Check } from 'lucide-react';

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

  const currentStatus = PROJECT_STATUS[status] || PROJECT_STATUS['WORKING'];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`w-44 flex items-center justify-between gap-2 px-4 py-2 rounded-full border border-gray-200 shadow font-semibold transition-all duration-200 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-status-stuck ${currentStatus.textColor}`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full ${currentStatus.color}`} />
          {currentStatus.label}
        </span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`absolute z-30 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-200 transition-all duration-200 origin-top-right ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'}`}
        style={{ minWidth: '11rem' }}
        role="listbox"
      >
        {Object.entries(PROJECT_STATUS).map(([key, value]) => (
          <button
            key={key}
            onClick={() => {
              onChange(key);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded-lg transition-colors duration-150 hover:bg-status-review/20 focus:bg-status-review/20 ${
              key === status ? 'bg-status-review/20 font-bold text-status-stuck' : 'text-gray-700'
            }`}
            role="option"
            aria-selected={key === status}
          >
            <span className={`inline-block w-3 h-3 rounded-full ${value.color}`} />
            <span className="flex-1">{value.label}</span>
            {key === status && <Check className="w-4 h-4 text-status-stuck" />}
          </button>
        ))}
      </div>
    </div>
  );
}