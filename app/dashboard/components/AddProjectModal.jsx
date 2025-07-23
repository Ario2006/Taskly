"use client";

import { useState } from 'react';
import { X } from 'lucide-react';
import { PROJECT_STATUS } from '@/lib/constants';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AddProjectModal({ isOpen, onClose, onAdd, currentUser }) {
  const [formData, setFormData] = useState({
    name: '',
    status: 'WORKING',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    priority: 3
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      name: formData.name,
      status: formData.status,
      duedate: formData.dueDate, // changed from dueDate to duedate
      priority: formData.priority
    });
    onClose();
    setFormData({
      name: '',
      status: 'WORKING',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      priority: 3
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Project</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <Input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {Object.entries(PROJECT_STATUS).map(([key, value]) => (
                <option key={key} value={key}>{value.label}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <Input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <Input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: level })}
                  className="focus:outline-none"
                  aria-label={`Set priority to ${level}`}
                >
                  <span
                    className={`cursor-pointer text-2xl transition-colors ${
                      formData.priority >= level ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex-1"
            >
              Add Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}