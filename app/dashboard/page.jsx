"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProjectTable from "./components/ProjectTable";
import AddProjectModal from "./components/AddProjectModal";
import { useProjects } from "@/hooks/useProjects";
import { calculateProjectStats } from "@/lib/utils";
import { Plus, Search, Filter } from 'lucide-react';
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  const { projects, loading, addProject, updateProject, deleteProject } = useProjects(user);

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Minimal UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <main className="pt-24 pb-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">My Projects</h1>
            <p className="text-gray-500">A minimal, elegant dashboard for your projects</p>
          </div>
          <div className="flex justify-between items-center mb-8 gap-2 flex-col sm:flex-row">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="default"
              size="lg"
              className="w-full sm:w-auto"
            >
              + New Project
            </Button>
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-x-auto transition-all">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Due Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Priority</th>
                  <th className="w-16"></th>
                </tr>
              </thead>
              <tbody>
                {projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-400 py-12">No projects found</td>
                  </tr>
                ) : (
                  projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(project => (
                    <tr
                      key={project.id}
                      className="border-b border-gray-100 hover:bg-blue-50/40 transition-colors group"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">{project.name}</td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {project.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-700">
                        <span className="inline-block px-2 py-1 rounded bg-green-50 text-green-600 font-bold">
                          {"June 25, 2025"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-2 py-1 rounded bg-yellow-50 text-yellow-600 font-bold">
                          {project.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteProject(project.id)}
                          className="w-full"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addProject}
        currentUser={user}
      />
    </div>
  );
}