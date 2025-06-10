"use client";

import { useState, useEffect } from 'react';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load projects from localStorage
  useEffect(() => {
    const loadProjects = () => {
      try {
        const stored = localStorage.getItem('taskly_projects');
        if (stored) {
          setProjects(JSON.parse(stored));
        } else {
          // Set some demo data if no projects exist
          const demoProjects = [
            {
              id: '1',
              name: 'Finalize kickoff materials',
              owner: { name: 'Sarah Chen', email: 'sarah@example.com' },
              status: 'DONE',
              startDate: '2024-09-01',
              dueDate: '2024-09-15',
              priority: 5
            },
            {
              id: '2',
              name: 'Refine objectives',
              owner: { name: 'Mike Johnson', email: 'mike@example.com' },
              status: 'WORKING',
              startDate: '2024-09-05',
              dueDate: '2024-09-19',
              priority: 5
            },
            {
              id: '3',
              name: 'Identify key resources',
              owner: { name: 'Emily Davis', email: 'emily@example.com' },
              status: 'STUCK',
              startDate: '2024-09-10',
              dueDate: '2024-09-22',
              priority: 3
            },
            {
              id: '4',
              name: 'Test plan',
              owner: { name: 'John Smith', email: 'john@example.com' },
              status: 'DONE',
              startDate: '2024-09-15',
              dueDate: '2024-09-26',
              priority: 4
            }
          ];
          setProjects(demoProjects);
          localStorage.setItem('taskly_projects', JSON.stringify(demoProjects));
        }
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('taskly_projects', JSON.stringify(projects));
    }
  }, [projects, loading]);

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    setProjects(prevProjects => [...prevProjects, newProject]);
  };

  const updateProject = (id, updates) => {
    setProjects(prevProjects => 
      prevProjects.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  };

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
    }
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject
  };
}