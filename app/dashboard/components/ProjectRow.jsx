"use client";

import { useState, useRef, useEffect } from 'react';
import StatusCell from './StatusCell';
import PriorityCell from './PriorityCell';
import TimelineBar from './TimelineBar';
import OwnerCell from './OwnerCell';
import { formatDate } from '@/lib/utils';
import { Trash2, MoreVertical } from 'lucide-react';

export default function ProjectRow({ project, onUpdate, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-blue-400 rounded-full" />
          <span className="font-medium text-gray-900">{project.name}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <OwnerCell owner={project.owner} />
      </td>
      <td className="py-4 px-6">
        <StatusCell
          status={project.status}
          onChange={(status) => onUpdate(project.id, { status })}
        />
      </td>
      <td className="py-4 px-6">
        <TimelineBar startDate={project.startDate} dueDate={project.dueDate} />
      </td>
      <td className="py-4 px-6 text-gray-600">
        {formatDate(project.dueDate)}
      </td>
      <td className="py-4 px-6">
        <PriorityCell
          priority={project.priority}
          onChange={(priority) => onUpdate(project.id, { priority })}
        />
      </td>
      <td className="py-4 px-6 relative" ref={menuRef}>
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
            <button
              onClick={() => {
                onDelete(project.id);
                setShowMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Project
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}