"use client";

import { calculateProgress, getDaysInfo } from '@/lib/utils';

export default function TimelineBar({ startDate, dueDate }) {
  const progress = calculateProgress(startDate, dueDate);
  const { daysElapsed, daysRemaining } = getDaysInfo(startDate, dueDate);
  
  return (
    <div className="relative group">
      <div className="w-40 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {daysElapsed} days done, {daysRemaining} days left
      </div>
    </div>
  );
}