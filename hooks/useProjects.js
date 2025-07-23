"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function useProjects(user) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        setProjects([]);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };
    fetchProjects();
  }, [user]);

  const addProject = async (project) => {
    if (!user) return;
    const payload = { ...project, user_id: user.id };
    console.log('Supabase insert payload:', payload);
    const { data, error } = await supabase
      .from('projects')
      .insert([payload])
      .select();
    if (error) {
      console.error('Supabase insert error:', error.message, error.details, error.hint);
    }
    if (!error && data) {
      setProjects((prev) => [data[0], ...prev]);
    }
  };

  const updateProject = async (id, updates) => {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select();
    if (!error && data) {
      setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    }
  };

  const deleteProject = async (id) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (!error) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
  };
}