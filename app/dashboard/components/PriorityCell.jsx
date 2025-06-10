"use client";

import { Star } from 'lucide-react';

export default function PriorityCell({ priority, onChange }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((level) => (
        <button
          key={level}
          onClick={() => onChange(level)}
          className="transition-all duration-200 hover:scale-110"
        >
          <Star
            size={20}
            className={`${
              level <= priority
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            } transition-colors duration-200`}
          />
        </button>
      ))}
    </div>
  );
}