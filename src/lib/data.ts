import { Company, Engineer, Project, Proposal, Review } from './types';

// Mock data para demonstração
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@techcorp.com',
    type: 'company',
    companyName: 'TechCorp Solutions',
    cnpj: '12.345.678/0001-90',
    description: 'Empresa de tecnologia especializada em soluções industriais',
    location: 'São Paulo, SP',
    website: 'https://techcorp.com',
    size: 'medium',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@construtora.com',
    type: 'company',
    companyName: 'Construtora Santos',
    cnpj: '98.765.432/0001-10',
    description: 'Construtora com 20 anos de experiência em obras residenciais e comerciais',
    location: 'Rio de Janeiro, RJ',
    size: 'large',
    createdAt: new Date('2024-02-01'),
  },
];

export const mockEngineers: Engineer[] = [
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos@email.com',
    type: 'engineer',
    title: 'Engenheiro Civil Sênior',
    specialties: ['Estruturas', 'Fundações', 'Projetos Residenciais'],
    experience: 8,
    location: 'São Paulo, SP',
    hourlyRate: 120,
    skills: ['AutoCAD', 'Revit', 'SAP2000', 'Gestão de Projetos'],
    availability: 'available',
    rating: 4.8,
    completedProjects: 45,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@email.com',
    type: 'engineer',
    title: 'Engenheira Mecânica',
    specialties: ['Automação Industrial', 'Sistemas Hidráulicos', 'Manutenção'],
    experience: 6,
    location: 'Belo Horizonte, MG',
    hourlyRate: 100,
    skills: ['SolidWorks', 'MATLAB', 'PLC', 'Hidráulica'],
    availability: 'available',
    rating: 4.9,
    completedProjects: 32,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '5',
    name: 'Roberto Lima',
    email: 'roberto@email.com',
    type: 'engineer',
    title: 'Engenheiro Elétrico',
    specialties: ['Sistemas de Energia', 'Automação', 'Projetos Industriais'],
    experience: 12,
    location: 'Porto Alegre, RS',
    hourlyRate: 140,
    skills: ['AutoCAD Electrical', 'ETAP', 'PLC', 'SCADA'],
    availability: 'busy',
    rating: 4.7,
    completedProjects: 78,
    createdAt: new Date('2024-01-05'),
  },
];

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Projeto de Estrutura para Edifício Comercial',
    description: 'Desenvolvimento de projeto estrutural completo para edifício comercial de 15 andares. Inclui cálculos estruturais, detalhamento de armaduras e acompanhamento da obra.',
    companyId: '1',
    company: mockCompanies[0],
    type: 'freelance',
    budget: { min: 25000, max: 35000 },
    location: 'São Paulo, SP',
    remote: false,
    skills: ['Estruturas', 'AutoCAD', 'SAP2000', 'Concreto Armado'],
    deadline: new Date('2024-12-15'),
    status: 'open',
    createdAt: new Date('2024-10-01'),
    proposals: [],
  },
  {
    id: '2',
    title: 'Automação de Linha de Produção',
    description: 'Projeto de automação completa para linha de produção de peças automotivas. Inclui programação de CLPs, interface HMI e sistema de supervisão.',
    companyId: '2',
    company: mockCompanies[1],
    type: 'clt',
    location: 'Rio de Janeiro, RJ',
    remote: true,
    skills: ['Automação', 'PLC', 'SCADA', 'Programação'],
    status: 'open',
    createdAt: new Date('2024-10-05'),
    proposals: [],
  },
];

export const mockProposals: Proposal[] = [
  {
    id: '1',
    projectId: '1',
    engineerId: '3',
    engineer: mockEngineers[0],
    price: 30000,
    timeline: '3 meses',
    description: 'Proposta completa para desenvolvimento do projeto estrutural com entrega em etapas: 1) Análise preliminar, 2) Cálculos estruturais, 3) Detalhamento final.',
    status: 'analyzing',
    createdAt: new Date('2024-10-02'),
    updatedAt: new Date('2024-10-02'),
  },
  {
    id: '2',
    projectId: '2',
    engineerId: '4',
    engineer: mockEngineers[1],
    price: 85000,
    timeline: '4 meses',
    description: 'Desenvolvimento completo do sistema de automação incluindo programação, testes e treinamento da equipe.',
    status: 'sent',
    createdAt: new Date('2024-10-06'),
    updatedAt: new Date('2024-10-06'),
  },
];

// Funções utilitárias
export const getStatusColor = (status: string) => {
  switch (status) {
    case 'sent':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'analyzing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'revision':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'approved':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'sent':
      return 'Enviada';
    case 'analyzing':
      return 'Em Análise';
    case 'revision':
      return 'Em Revisão';
    case 'approved':
      return 'Aprovada';
    case 'rejected':
      return 'Rejeitada';
    default:
      return status;
  }
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};