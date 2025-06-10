"use client";

import { useState } from 'react';
import React from 'react';
import { groupProjectsByMonth } from '@/lib/utils';
import ProjectRow from './ProjectRow';
import GroupHeader from './GroupHeader';

export default function ProjectTable({ projects, onUpdate, onDelete, searchTerm }) {
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.owner?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedProjects = groupProjectsByMonth(filteredProjects);
  const sortedGroups = Object.keys(groupedProjects).sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  if (filteredProjects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500">No projects found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-6 font-medium text-gray-700">Project Name</th>
            <th className="text-center py-3 px-6 font-medium text-gray-700">Owner</th>
            <th className="text-center py-3 px-6 font-medium text-gray-700">Status</th>
            <th className="text-center py-3 px-6 font-medium text-gray-700">Timeline</th>
            <th className="text-center py-3 px-6 font-medium text-gray-700">Due Date</th>
            <th className="text-center py-3 px-6 font-medium text-gray-700">Priority</th>
            <th className="w-16"></th>
          </tr>
        </thead>
        <tbody>
          {sortedGroups.map((group) => {
            const isExpanded = expandedGroups[group] !== false;
            const groupProjects = groupedProjects[group];
            
            return (
              <React.Fragment key={group}>
                <tr>
                  <td colSpan="7" className="p-0">
                    <GroupHeader
                      title={group}
                      isExpanded={isExpanded}
                      onToggle={() => toggleGroup(group)}
                    />
                  </td>
                </tr>
                {isExpanded && groupProjects.map((project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}