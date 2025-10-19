export interface User {
  id: string;
  name: string;
  email: string;
  type: 'company' | 'engineer';
  avatar?: string;
  createdAt: Date;
}

export interface Company extends User {
  type: 'company';
  companyName: string;
  cnpj: string;
  description: string;
  location: string;
  website?: string;
  size: 'startup' | 'small' | 'medium' | 'large';
}

export interface Engineer extends User {
  type: 'engineer';
  title: string;
  specialties: string[];
  experience: number;
  location: string;
  hourlyRate?: number;
  portfolio?: string;
  skills: string[];
  availability: 'available' | 'busy' | 'unavailable';
  rating: number;
  completedProjects: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  companyId: string;
  company: Company;
  type: 'freelance' | 'clt';
  budget?: {
    min: number;
    max: number;
  };
  location: string;
  remote: boolean;
  skills: string[];
  deadline?: Date;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  images?: string[];
  proposals: Proposal[];
}

export interface Proposal {
  id: string;
  projectId: string;
  engineerId: string;
  engineer: Engineer;
  price: number;
  timeline: string;
  description: string;
  attachments?: string[];
  status: 'sent' | 'analyzing' | 'revision' | 'approved' | 'rejected';
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  projectId: string;
  reviewerId: string;
  reviewedId: string;
  rating: number;
  comment: string;
  type: 'company_to_engineer' | 'engineer_to_company';
  createdAt: Date;
}

export type ProposalStatus = 'sent' | 'analyzing' | 'revision' | 'approved' | 'rejected';
export type ProjectType = 'freelance' | 'clt';
export type UserType = 'company' | 'engineer';