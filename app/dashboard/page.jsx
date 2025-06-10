"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectTable from "./components/ProjectTable";
import AddProjectModal from "./components/AddProjectModal";
import { useProjects } from "@/hooks/useProjects";
import { calculateProjectStats } from "@/lib/utils";
import { Plus, Search, Filter } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();

  useEffect(() => {
    const currentUser = localStorage.getItem('taskly_current_user');
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, [router]);

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = calculateProjectStats(projects);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Overview</h1>
            <p className="text-gray-600">Manage and track all your projects in one place</p>
          </div>

          {/* Actions Bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Project
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5 text-gray-600" />
              Filter
            </button>
          </div>

          {/* Projects Table */}
          <ProjectTable 
            projects={projects}
            onUpdate={updateProject}
            onDelete={deleteProject}
            searchTerm={searchTerm}
          />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Total Projects</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Completed</h3>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">In Progress</h3>
              <p className="text-2xl font-bold text-yellow-400">{stats.inProgress}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Stuck</h3>
              <p className="text-2xl font-bold text-red-500">{stats.stuck}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addProject}
        currentUser={user}
      />
    </div>
  );
}