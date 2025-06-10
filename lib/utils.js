import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { MONTHS } from './constants';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  const d = new Date(date);
  const month = MONTHS[d.getMonth()].slice(0, 3);
  return `${month} ${d.getDate()}`;
}

export function getMonthYear(date) {
  const d = new Date(date);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function calculateProgress(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  
  if (now < start) return 0;
  if (now > end) return 100;
  
  const total = end - start;
  const elapsed = now - start;
  
  return Math.round((elapsed / total) * 100);
}

export function getDaysInfo(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  
  const msPerDay = 24 * 60 * 60 * 1000;
  
  const daysElapsed = Math.max(0, Math.floor((now - start) / msPerDay));
  const daysRemaining = Math.max(0, Math.floor((end - now) / msPerDay));
  
  return { daysElapsed, daysRemaining };
}

export function groupProjectsByMonth(projects) {
  const groups = {};
  
  projects.forEach(project => {
    const monthYear = getMonthYear(project.dueDate);
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(project);
  });
  
  return groups;
}

export function calculateProjectStats(projects) {
  const stats = {
    total: projects.length,
    completed: 0,
    inProgress: 0,
    stuck: 0
  };
  
  projects.forEach(project => {
    switch (project.status) {
      case 'DONE':
        stats.completed++;
        break;
      case 'WORKING':
        stats.inProgress++;
        break;
      case 'STUCK':
        stats.stuck++;
        break;
    }
  });
  
  return stats;
}