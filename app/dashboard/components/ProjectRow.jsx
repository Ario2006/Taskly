"use client";

import { useState, useRef, useEffect } from 'react';
import StatusCell from './StatusCell';
import PriorityCell from './PriorityCell';
import TimelineBar from './TimelineBar';
import OwnerCell from './OwnerCell';
import { formatDate } from '@/lib/utils';
import { Trash2, MoreVertical, Calendar } from 'lucide-react';

export default function ProjectRow({ project, onUpdate, onDelete, zebra }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <tr
      className={`transition-colors group ${zebra ? 'bg-white' : 'bg-gray-50/80'} hover:bg-blue-50/60 hover:shadow-md`}
    >
      <td className="py-4 px-6 rounded-l-xl group-first:rounded-tl-2xl group-last:rounded-bl-2xl">
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
      <td className="py-4 px-6">
        <span className="flex items-center gap-2 text-base font-bold text-status-stuck">
          <Calendar className="w-4 h-4 text-status-stuck" />
          {formatDate(project.dueDate)}
        </span>
      </td>
      <td className="py-4 px-6">
        <PriorityCell
          priority={project.priority}
          onChange={(priority) => onUpdate(project.id, { priority })}
        />
      </td>
      <td className="py-4 px-6 relative rounded-r-xl group-first:rounded-tr-2xl group-last:rounded-br-2xl" ref={menuRef}>
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