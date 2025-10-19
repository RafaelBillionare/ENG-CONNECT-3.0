'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Briefcase, 
  TrendingUp,
  Building2,
  Wrench,
  ArrowRight,
  CheckCircle,
  Eye,
  MessageSquare,
  Plus,
  Settings,
  Bell,
  Zap,
  Shield,
  Target,
  Award,
  Rocket,
  ChevronRight,
  Filter,
  X,
  Calendar,
  DollarSign,
  Upload,
  FileText,
  Send,
  AlertCircle,
  User,
  LogOut,
  BarChart3,
  FolderOpen,
  Edit,
  Save,
  ChevronDown,
  TrendingDown,
  Activity,
  PieChart
} from 'lucide-react';
import { mockProjects, mockEngineers, mockProposals, formatCurrency, formatDate } from '@/lib/data';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { SendProposalModal } from '@/components/SendProposalModal';
import { ProposalManagement } from '@/components/ProposalManagement';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';
import { ProfileSetup } from '@/components/ProfileSetup';
import { Project, Engineer, Proposal, ProposalStatus, User } from '@/lib/types';

type AppState = 'landing' | 'login' | 'signup' | 'profile-setup' | 'dashboard';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [signupData, setSignupData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showSendProposal, setShowSendProposal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedEngineer] = useState<Engineer>(mockEngineers[0]); // Mock do engenheiro logado
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [projectToView, setProjectToView] = useState<Project | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Novos estados para o formulário de candidatura
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    message: '',
    portfolioFile: null as File | null
  });

  // NOVOS ESTADOS PARA RECURSOS ADMINISTRATIVOS DO ENGENHEIRO
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showMyApplications, setShowMyApplications] = useState(false);
  const [showMyProposals, setShowMyProposals] = useState(false);
  const [showDashboardStats, setShowDashboardStats] = useState(false);
  const [profileData, setProfileData] = useState({
    name: selectedEngineer.name,
    email: selectedEngineer.email,
    title: selectedEngineer.title,
    experience: selectedEngineer.experience,
    location: selectedEngineer.location,
    phone: selectedEngineer.phone || '',
    bio: 'Engenheiro civil com experiência em projetos estruturais e gerenciamento de obras.',
    specialties: selectedEngineer.specialties,
    hourlyRate: selectedEngineer.hourlyRate || 0,
    linkedin: '',
    github: '',
    website: ''
  });
  const [curriculumFile, setCurriculumFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  // Mock de dados para estatísticas do engenheiro
  const engineerStats = {
    applications: {
      total: 15,
      pending: 3,
      interviews: 2,
      rejected: 7,
      accepted: 2,
      closed: 1,
      successRate: 13.3 // (accepted / total) * 100
    },
    proposals: {
      total: 28,
      pending: 5,
      negotiating: 3,
      accepted: 12,
      rejected: 6,
      completed: 10,
      cancelled: 2,
      successRate: 42.9 // (accepted / total) * 100
    },
    earnings: {
      total: 85000,
      thisMonth: 12500,
      averageProject: 7083
    }
  };

  const handleLogin = (credentials: { email: string; password: string }) => {
    // Simular login - em produção, fazer chamada para API
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      email: credentials.email,
      type: 'company', // Seria determinado pela API
      createdAt: new Date()
    };
    setCurrentUser(mockUser);
    setAppState('dashboard');
  };

  const handleSignup = (userData: { name: string; email: string; password: string }) => {
    setSignupData(userData);
    setAppState('profile-setup');
  };

  const handleProfileComplete = (profileData: any) => {
    setCurrentUser(profileData);
    setAppState('dashboard');
  };

  const handleCreateProject = (projectData: any) => {
    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      companyId: '1',
      company: {
        id: '1',
        name: 'João Silva',
        email: 'joao@techcorp.com',
        type: 'company',
        companyName: 'TechCorp Solutions',
        cnpj: '12.345.678/0001-90',
        description: 'Empresa de tecnologia especializada em soluções industriais',
        location: 'São Paulo, SP',
        website: 'https://techcorp.com',
        size: 'medium' as const,
        createdAt: new Date('2024-01-15'),
      },
      status: 'open' as const,
      remote: false,
      createdAt: new Date(),
      proposals: [],
      budget: projectData.budgetMin && projectData.budgetMax ? {
        min: projectData.budgetMin,
        max: projectData.budgetMax
      } : undefined
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const handleSendProposal = (proposalData: any) => {
    const newProposal: Proposal = {
      id: Date.now().toString(),
      ...proposalData,
      engineer: selectedEngineer,
      status: 'sent' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProposals(prev => [newProposal, ...prev]);
  };

  const handleUpdateProposalStatus = (proposalId: string, status: ProposalStatus, feedback?: string) => {
    setProposals(prev => prev.map(proposal => 
      proposal.id === proposalId 
        ? { ...proposal, status, feedback, updatedAt: new Date() }
        : proposal
    ));
  };

  const handleViewProjectDetails = (project: Project) => {
    setProjectToView(project);
    setShowProjectDetails(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Por favor, selecione apenas arquivos PDF.');
    }
  };

  const handlePortfolioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setApplicationData(prev => ({ ...prev, portfolioFile: file }));
    } else {
      alert('Por favor, selecione apenas arquivos PDF para o portfólio.');
    }
  };

  // NOVA FUNÇÃO: Abrir formulário de candidatura
  const handleOpenApplicationForm = (project: Project) => {
    setProjectToView(project);
    setShowApplicationForm(true);
    setShowProjectDetails(false);
  };

  // NOVA FUNÇÃO: Enviar candidatura completa
  const handleSubmitApplication = () => {
    if (!applicationData.message.trim()) {
      alert('Por favor, adicione uma mensagem de apresentação.');
      return;
    }

    if (projectToView) {
      // Criar nova proposta com dados completos
      const applicationProposal: Proposal = {
        id: Date.now().toString(),
        projectId: projectToView.id,
        project: projectToView,
        engineer: selectedEngineer,
        message: applicationData.message,
        budget: projectToView.budget?.min || 0,
        timeline: '30 dias',
        status: 'sent' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        attachments: [
          // Currículo do perfil (sempre incluído)
          {
            name: 'curriculo.pdf',
            url: '/mock-curriculum.pdf',
            type: 'pdf'
          },
          // Portfólio (se fornecido)
          ...(applicationData.portfolioFile ? [{
            name: applicationData.portfolioFile.name,
            url: URL.createObjectURL(applicationData.portfolioFile),
            type: 'pdf'
          }] : [])
        ]
      };

      // Adicionar proposta à lista
      setProposals(prev => [applicationProposal, ...prev]);

      // Simular notificação para a empresa
      const companyNotification = {
        type: 'new_application',
        message: `Nova candidatura recebida de ${selectedEngineer.name} para a vaga "${projectToView.title}"`,
        engineerData: {
          name: selectedEngineer.name,
          email: selectedEngineer.email,
          title: selectedEngineer.title,
          experience: selectedEngineer.experience,
          specialties: selectedEngineer.specialties,
          location: selectedEngineer.location,
          rating: selectedEngineer.rating,
          hourlyRate: selectedEngineer.hourlyRate,
          availability: selectedEngineer.availability,
          phone: selectedEngineer.phone || 'Não informado'
        },
        applicationMessage: applicationData.message,
        attachments: applicationProposal.attachments,
        timestamp: new Date()
      };

      console.log('Candidatura enviada para o painel da empresa:', companyNotification);

      alert(`✅ Candidatura enviada com sucesso!\n\nSua candidatura para "${projectToView.title}" foi enviada para ${projectToView.company.companyName}.\n\n📋 Dados enviados:\n• Seu perfil profissional completo\n• Currículo registrado no seu perfil\n• Mensagem de apresentação\n${applicationData.portfolioFile ? `• Portfólio: ${applicationData.portfolioFile.name}` : ''}\n\n🔔 Você será notificado sobre o status da sua candidatura.`);
      
      // Limpar formulário e fechar modais
      setApplicationData({ message: '', portfolioFile: null });
      setShowApplicationForm(false);
      setProjectToView(null);
    }
  };

  // NOVAS FUNÇÕES PARA RECURSOS ADMINISTRATIVOS
  const handleSaveProfile = () => {
    // Em produção, fazer chamada para API
    alert('✅ Perfil atualizado com sucesso!');
    setShowProfileEdit(false);
  };

  const handleCurriculumUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setCurriculumFile(file);
      alert('✅ Currículo anexado com sucesso!');
    } else {
      alert('Por favor, selecione apenas arquivos PDF.');
    }
  };

  const handlePortfolioFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPortfolioFile(file);
      alert('✅ Portfólio anexado com sucesso!');
    } else {
      alert('Por favor, selecione apenas arquivos PDF.');
    }
  };

  // Renderizar diferentes estados da aplicação
  if (appState === 'login') {
    return (
      <LoginForm 
        onLogin={handleLogin}
        onSignup={() => setAppState('signup')}
      />
    );
  }

  if (appState === 'signup') {
    return (
      <SignupForm 
        onSignup={handleSignup}
        onBackToLogin={() => setAppState('login')}
      />
    );
  }

  if (appState === 'profile-setup' && signupData) {
    return (
      <ProfileSetup 
        userData={signupData}
        onComplete={handleProfileComplete}
      />
    );
  }

  if (appState === 'dashboard' && currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EngConnect</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  <Settings className="w-4 h-4" />
                </Button>
                
                {/* MENU DROPDOWN DO USUÁRIO ENGENHEIRO - IMPLEMENTAÇÃO COMPLETA */}
                {currentUser.type === 'engineer' ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-red-600 text-white text-sm">
                            {currentUser.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 bg-gray-900 border-gray-700">
                      <div className="px-3 py-2 border-b border-gray-700">
                        <p className="text-white font-medium">{currentUser.name}</p>
                        <p className="text-gray-400 text-sm">{selectedEngineer.title}</p>
                      </div>
                      
                      <DropdownMenuItem 
                        onClick={() => setShowProfileEdit(true)}
                        className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                      >
                        <Edit className="w-4 h-4 mr-3" />
                        Editar Perfil
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => document.getElementById('curriculum-upload')?.click()}
                        className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                      >
                        <FileText className="w-4 h-4 mr-3" />
                        Anexar Currículo
                        <input
                          id="curriculum-upload"
                          type="file"
                          accept=".pdf"
                          onChange={handleCurriculumUpload}
                          className="hidden"
                        />
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => document.getElementById('portfolio-upload')?.click()}
                        className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                      >
                        <FolderOpen className="w-4 h-4 mr-3" />
                        Anexar Portfólio
                        <input
                          id="portfolio-upload"
                          type="file"
                          accept=".pdf"
                          onChange={handlePortfolioFileUpload}
                          className="hidden"
                        />
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator className="bg-gray-700" />
                      
                      <DropdownMenuItem 
                        onClick={() => setShowMyApplications(true)}
                        className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                      >
                        <Briefcase className="w-4 h-4 mr-3" />
                        Minhas Candidaturas
                        <Badge variant="secondary" className="ml-auto bg-blue-600 text-white text-xs">
                          {engineerStats.applications.total}
                        </Badge>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => setShowMyProposals(true)}
                        className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4 mr-3" />
                        Minhas Propostas
                        <Badge variant="secondary" className="ml-auto bg-green-600 text-white text-xs">
                          {engineerStats.proposals.total}
                        </Badge>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => window.open('/dashboard', '_blank')}
                        className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                      >
                        <BarChart3 className="w-4 h-4 mr-3" />
                        Meu Dashboard
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator className="bg-gray-700" />
                      
                      <DropdownMenuItem 
                        onClick={() => {
                          setCurrentUser(null);
                          setAppState('landing');
                        }}
                        className="text-red-400 hover:text-red-300 hover:bg-gray-800 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      className="text-gray-300 hover:text-white"
                      onClick={() => {
                        setCurrentUser(null);
                        setAppState('landing');
                      }}
                    >
                      Sair
                    </Button>
                    <Avatar>
                      <AvatarFallback className="bg-red-600 text-white">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {currentUser.type === 'company' ? (
            <CompanyDashboard 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              onCreateProject={() => setShowCreateProject(true)}
              proposals={proposals}
              onUpdateProposalStatus={handleUpdateProposalStatus}
            />
          ) : (
            <EngineerDashboard 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              projects={projects}
              onSendProposal={(project) => {
                if (project.type === 'clt') {
                  handleOpenApplicationForm(project);
                } else {
                  setSelectedProject(project);
                  setShowSendProposal(true);
                }
              }}
              onViewDetails={handleViewProjectDetails}
            />
          )}
        </div>

        {/* MODAL DE EDIÇÃO DE PERFIL - CORRIGIDO */}
        <Dialog open={showProfileEdit} onOpenChange={setShowProfileEdit}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white mb-2 flex items-center">
                <Edit className="w-6 h-6 mr-3 text-blue-500" />
                Editar Perfil
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Atualize suas informações profissionais
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Nome Completo</label>
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white h-10"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <Input
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Cargo/Título</label>
                  <Input
                    value={profileData.title}
                    onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white h-10"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Anos de Experiência</label>
                  <Input
                    type="number"
                    value={profileData.experience}
                    onChange={(e) => setProfileData(prev => ({ ...prev, experience: parseInt(e.target.value) }))}
                    className="bg-gray-800 border-gray-600 text-white h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Localização</label>
                  <Input
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white h-10"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Telefone</label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-gray-800 border-gray-600 text-white h-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Biografia Profissional</label>
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
                  placeholder="Descreva sua experiência e especialidades..."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Valor por Hora (R$)</label>
                <Input
                  type="number"
                  value={profileData.hourlyRate}
                  onChange={(e) => setProfileData(prev => ({ ...prev, hourlyRate: parseFloat(e.target.value) }))}
                  className="bg-gray-800 border-gray-600 text-white h-10"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                  onClick={handleSaveProfile}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={() => setShowProfileEdit(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* MODAL DE CANDIDATURAS - CORRIGIDO */}
        <Dialog open={showMyApplications} onOpenChange={setShowMyApplications}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white mb-2 flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-green-500" />
                Minhas Candidaturas
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Acompanhe o status das suas candidaturas para empregos
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 p-2">
              {/* Estatísticas Rápidas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{engineerStats.applications.total}</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
                <div className="bg-yellow-900/30 rounded-lg p-4 text-center border border-yellow-700/50">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{engineerStats.applications.pending}</div>
                  <div className="text-sm text-gray-400">Em Análise</div>
                </div>
                <div className="bg-green-900/30 rounded-lg p-4 text-center border border-green-700/50">
                  <div className="text-2xl font-bold text-green-400 mb-1">{engineerStats.applications.accepted}</div>
                  <div className="text-sm text-gray-400">Aceitas</div>
                </div>
                <div className="bg-red-900/30 rounded-lg p-4 text-center border border-red-700/50">
                  <div className="text-2xl font-bold text-red-400 mb-1">{engineerStats.applications.rejected}</div>
                  <div className="text-sm text-gray-400">Rejeitadas</div>
                </div>
              </div>

              {/* Taxa de Sucesso */}
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">Taxa de Sucesso</span>
                  <span className="text-green-400 font-bold text-lg">{engineerStats.applications.successRate}%</span>
                </div>
                <Progress value={engineerStats.applications.successRate} className="h-3" />
              </div>

              {/* Lista de Candidaturas Mock */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Candidaturas Recentes</h3>
                {[
                  { id: 1, title: 'Engenheiro Civil Sênior', company: 'TechCorp', status: 'interview', date: '2024-01-15' },
                  { id: 2, title: 'Coordenador de Projetos', company: 'BuildMax', status: 'pending', date: '2024-01-12' },
                  { id: 3, title: 'Engenheiro Estrutural', company: 'Construtora ABC', status: 'rejected', date: '2024-01-10' }
                ].map((app) => (
                  <div key={app.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium mb-1">{app.title}</h4>
                        <p className="text-gray-400">{app.company}</p>
                      </div>
                      <div className="text-right ml-4">
                        <Badge 
                          variant={app.status === 'interview' ? 'default' : app.status === 'pending' ? 'secondary' : 'destructive'}
                          className={`mb-2 ${
                            app.status === 'interview' ? 'bg-blue-600' :
                            app.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                        >
                          {app.status === 'interview' ? 'Entrevista' :
                           app.status === 'pending' ? 'Em Análise' : 'Rejeitada'}
                        </Badge>
                        <p className="text-gray-500 text-sm">{formatDate(new Date(app.date))}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* MODAL DE PROPOSTAS - CORRIGIDO */}
        <Dialog open={showMyProposals} onOpenChange={setShowMyProposals}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white mb-2 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-blue-500" />
                Minhas Propostas
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Acompanhe suas propostas para serviços de engenharia
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 p-2">
              {/* Estatísticas de Propostas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-white mb-1">{engineerStats.proposals.total}</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-4 text-center border border-blue-700/50">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{engineerStats.proposals.pending}</div>
                  <div className="text-sm text-gray-400">Pendentes</div>
                </div>
                <div className="bg-green-900/30 rounded-lg p-4 text-center border border-green-700/50">
                  <div className="text-2xl font-bold text-green-400 mb-1">{engineerStats.proposals.accepted}</div>
                  <div className="text-sm text-gray-400">Aceitas</div>
                </div>
                <div className="bg-purple-900/30 rounded-lg p-4 text-center border border-purple-700/50">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{engineerStats.proposals.completed}</div>
                  <div className="text-sm text-gray-400">Concluídas</div>
                </div>
              </div>

              {/* Taxa de Sucesso das Propostas */}
              <div className="bg-gray-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">Taxa de Sucesso</span>
                  <span className="text-green-400 font-bold text-lg">{engineerStats.proposals.successRate}%</span>
                </div>
                <Progress value={engineerStats.proposals.successRate} className="h-3" />
              </div>

              {/* Lista de Propostas Mock */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Propostas Recentes</h3>
                {proposals.slice(0, 5).map((proposal) => (
                  <div key={proposal.id} className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium mb-1">{proposal.project?.title || 'Projeto'}</h4>
                        <p className="text-gray-400 mb-1">{proposal.project?.company.companyName}</p>
                        <p className="text-green-400 font-medium">{formatCurrency(proposal.budget)}</p>
                      </div>
                      <div className="text-right ml-4">
                        <Badge 
                          variant={proposal.status === 'accepted' ? 'default' : proposal.status === 'sent' ? 'secondary' : 'destructive'}
                          className={`mb-2 ${
                            proposal.status === 'accepted' ? 'bg-green-600' :
                            proposal.status === 'sent' ? 'bg-blue-600' : 'bg-red-600'
                          }`}
                        >
                          {proposal.status === 'accepted' ? 'Aceita' :
                           proposal.status === 'sent' ? 'Enviada' : 'Rejeitada'}
                        </Badge>
                        <p className="text-gray-500 text-sm">{formatDate(proposal.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* MODAL DO DASHBOARD DE ESTATÍSTICAS - REDESENHADO COMPLETAMENTE */}
        <Dialog open={showDashboardStats} onOpenChange={setShowDashboardStats}>
          <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-3xl text-white mb-3 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-red-500" />
                Meu Dashboard
              </DialogTitle>
              <DialogDescription className="text-gray-400 text-lg">
                Análise completa do seu desempenho profissional
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-10 p-6">
              {/* SEÇÃO DE GANHOS - REDESENHADA PARA EVITAR SOBREPOSIÇÃO */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Card de Ganhos Totais - REDESENHADO */}
                <Card className="bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-700/60 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-green-300 flex items-center text-xl font-bold">
                      <TrendingUp className="w-7 h-7 mr-3" />
                      Ganhos Totais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-4xl font-black text-white">
                        {formatCurrency(engineerStats.earnings.total)}
                      </div>
                      <div className="text-green-400 font-semibold text-lg">
                        +{formatCurrency(engineerStats.earnings.thisMonth)} este mês
                      </div>
                    </div>
                    <div className="pt-3 border-t border-green-700/50">
                      <div className="text-sm text-green-200">
                        Baseado em {engineerStats.proposals.completed} projetos concluídos
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card de Taxa de Sucesso - REDESENHADO */}
                <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-700/60 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-blue-300 flex items-center text-xl font-bold">
                      <Activity className="w-7 h-7 mr-3" />
                      Taxa Geral
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-4xl font-black text-white">
                        {((engineerStats.applications.successRate + engineerStats.proposals.successRate) / 2).toFixed(1)}%
                      </div>
                      <div className="text-blue-400 font-semibold">
                        Taxa de Sucesso Média
                      </div>
                    </div>
                    <div className="pt-3 border-t border-blue-700/50">
                      <div className="text-sm text-blue-200">
                        Candidaturas: {engineerStats.applications.successRate}% | Propostas: {engineerStats.proposals.successRate}%
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card de Valor Médio - REDESENHADO */}
                <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-700/60 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-purple-300 flex items-center text-xl font-bold">
                      <PieChart className="w-7 h-7 mr-3" />
                      Valor Médio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-4xl font-black text-white">
                        {formatCurrency(engineerStats.earnings.averageProject)}
                      </div>
                      <div className="text-purple-400 font-semibold">
                        Por Projeto
                      </div>
                    </div>
                    <div className="pt-3 border-t border-purple-700/50">
                      <div className="text-sm text-purple-200">
                        Média calculada dos últimos projetos
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ANÁLISE DETALHADA - REDESENHADA EM GRID RESPONSIVO */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Análise de Candidaturas - REDESENHADA */}
                <Card className="bg-gray-800/40 border-gray-700/60 shadow-xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-white flex items-center text-2xl font-bold">
                      <Briefcase className="w-7 h-7 mr-3 text-green-500" />
                      Candidaturas (Empregos)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Estatísticas em Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-1">{engineerStats.applications.total}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Total</div>
                      </div>
                      <div className="bg-yellow-900/30 rounded-lg p-4 text-center border border-yellow-700/50">
                        <div className="text-2xl font-bold text-yellow-400 mb-1">{engineerStats.applications.pending}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Em Análise</div>
                      </div>
                      <div className="bg-blue-900/30 rounded-lg p-4 text-center border border-blue-700/50">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{engineerStats.applications.interviews}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Entrevistas</div>
                      </div>
                      <div className="bg-green-900/30 rounded-lg p-4 text-center border border-green-700/50">
                        <div className="text-2xl font-bold text-green-400 mb-1">{engineerStats.applications.accepted}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Aceitas</div>
                      </div>
                    </div>
                    
                    {/* Taxa de Sucesso */}
                    <div className="bg-gray-900/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-semibold">Taxa de Sucesso</span>
                        <span className="text-green-400 font-bold text-xl">{engineerStats.applications.successRate}%</span>
                      </div>
                      <Progress value={engineerStats.applications.successRate} className="h-4" />
                    </div>
                  </CardContent>
                </Card>

                {/* Análise de Propostas - REDESENHADA */}
                <Card className="bg-gray-800/40 border-gray-700/60 shadow-xl">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-white flex items-center text-2xl font-bold">
                      <MessageSquare className="w-7 h-7 mr-3 text-blue-500" />
                      Propostas (Serviços)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Estatísticas em Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white mb-1">{engineerStats.proposals.total}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Total</div>
                      </div>
                      <div className="bg-yellow-900/30 rounded-lg p-4 text-center border border-yellow-700/50">
                        <div className="text-2xl font-bold text-yellow-400 mb-1">{engineerStats.proposals.pending}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Pendentes</div>
                      </div>
                      <div className="bg-green-900/30 rounded-lg p-4 text-center border border-green-700/50">
                        <div className="text-2xl font-bold text-green-400 mb-1">{engineerStats.proposals.accepted}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Aceitas</div>
                      </div>
                      <div className="bg-purple-900/30 rounded-lg p-4 text-center border border-purple-700/50">
                        <div className="text-2xl font-bold text-purple-400 mb-1">{engineerStats.proposals.completed}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Concluídas</div>
                      </div>
                    </div>
                    
                    {/* Taxa de Sucesso */}
                    <div className="bg-gray-900/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-semibold">Taxa de Sucesso</span>
                        <span className="text-green-400 font-bold text-xl">{engineerStats.proposals.successRate}%</span>
                      </div>
                      <Progress value={engineerStats.proposals.successRate} className="h-4" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* INSIGHTS E RECOMENDAÇÕES - REDESENHADA */}
              <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/60 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-white flex items-center text-2xl font-bold">
                    <Target className="w-7 h-7 mr-3 text-red-500" />
                    Insights e Recomendações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-blue-900/30 border border-blue-700/60 rounded-xl p-6 shadow-lg">
                      <h4 className="text-blue-300 font-bold mb-4 text-lg flex items-center">
                        💡 Oportunidade de Melhoria
                      </h4>
                      <p className="text-gray-200 leading-relaxed">
                        Sua taxa de sucesso em candidaturas está em {engineerStats.applications.successRate}%. 
                        Considere personalizar mais suas mensagens de apresentação para aumentar suas chances.
                      </p>
                    </div>
                    <div className="bg-green-900/30 border border-green-700/60 rounded-xl p-6 shadow-lg">
                      <h4 className="text-green-300 font-bold mb-4 text-lg flex items-center">
                        🎯 Ponto Forte
                      </h4>
                      <p className="text-gray-200 leading-relaxed">
                        Excelente performance em propostas de serviços ({engineerStats.proposals.successRate}%)! 
                        Continue focando neste tipo de oportunidade para maximizar seus ganhos.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modals */}
        <CreateProjectModal
          isOpen={showCreateProject}
          onClose={() => setShowCreateProject(false)}
          onSubmit={handleCreateProject}
        />

        {selectedProject && (
          <SendProposalModal
            isOpen={showSendProposal}
            onClose={() => {
              setShowSendProposal(false);
              setSelectedProject(null);
            }}
            project={selectedProject}
            engineer={selectedEngineer}
            onSubmit={handleSendProposal}
          />
        )}

        {/* FORMULÁRIO DE CANDIDATURA MINIMALISTA - REDESENHADO */}
        <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white mb-2 flex items-center">
                <Send className="w-6 h-6 mr-2 text-green-500" />
                Enviar Currículo
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Confirme o envio da sua candidatura com os dados do seu perfil
              </DialogDescription>
            </DialogHeader>

            {projectToView && (
              <div className="space-y-6">
                {/* Resumo da Vaga - Minimalista */}
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                  <h3 className="text-white font-semibold text-lg mb-2">{projectToView.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{projectToView.company.companyName}</span>
                    <span>•</span>
                    <span>{projectToView.location}</span>
                    {projectToView.budget && (
                      <>
                        <span>•</span>
                        <span className="text-green-400 font-medium">
                          {formatCurrency(projectToView.budget.min)} - {formatCurrency(projectToView.budget.max)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Resumo dos Dados do Perfil - Pré-preenchidos */}
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-blue-300 font-medium mb-3">Dados do Seu Perfil (Enviados Automaticamente)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-blue-200 font-medium">Nome:</span>
                          <span className="text-blue-100 ml-2">{selectedEngineer.name}</span>
                        </div>
                        <div>
                          <span className="text-blue-200 font-medium">Email:</span>
                          <span className="text-blue-100 ml-2">{selectedEngineer.email}</span>
                        </div>
                        <div>
                          <span className="text-blue-200 font-medium">Cargo:</span>
                          <span className="text-blue-100 ml-2">{selectedEngineer.title}</span>
                        </div>
                        <div>
                          <span className="text-blue-200 font-medium">Experiência:</span>
                          <span className="text-blue-100 ml-2">{selectedEngineer.experience} anos</span>
                        </div>
                        <div>
                          <span className="text-blue-200 font-medium">Localização:</span>
                          <span className="text-blue-100 ml-2">{selectedEngineer.location}</span>
                        </div>
                        <div>
                          <span className="text-blue-200 font-medium">Avaliação:</span>
                          <span className="text-blue-100 ml-2">{selectedEngineer.rating}★</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mensagem de Apresentação - OBRIGATÓRIA */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Mensagem de Apresentação *
                  </label>
                  <Textarea
                    placeholder="Conte um pouco sobre você, sua experiência e por que tem interesse nesta vaga..."
                    value={applicationData.message}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
                    maxLength={1000}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {applicationData.message.length}/1000 caracteres
                  </div>
                </div>

                {/* Upload de Portfólio - OPCIONAL */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Portfólio (Opcional)
                  </label>
                  <div className="w-full border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handlePortfolioUpload}
                      className="hidden"
                      id="portfolio-upload"
                    />
                    <label htmlFor="portfolio-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-300 mb-1">
                        {applicationData.portfolioFile ? applicationData.portfolioFile.name : 'Clique para anexar seu portfólio'}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Apenas arquivos PDF são aceitos (opcional)
                      </p>
                    </label>
                  </div>
                  
                  {applicationData.portfolioFile && (
                    <div className="flex items-center space-x-2 p-3 bg-green-900/20 border border-green-700/50 rounded-lg mt-2">
                      <FileText className="w-4 h-4 text-green-400" />
                      <span className="text-green-300 text-sm">{applicationData.portfolioFile.name}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setApplicationData(prev => ({ ...prev, portfolioFile: null }))}
                        className="text-gray-400 hover:text-white ml-auto"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="flex space-x-4 pt-4">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
                    onClick={handleSubmitApplication}
                    disabled={!applicationData.message.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Confirmar Candidatura
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => {
                      setShowApplicationForm(false);
                      setApplicationData({ message: '', portfolioFile: null });
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Detalhes do Projeto - MELHORADO */}
        <Dialog open={showProjectDetails} onOpenChange={setShowProjectDetails}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <DialogTitle className="text-3xl font-bold text-white mb-3">
                    {projectToView?.title}
                  </DialogTitle>
                  <div className="flex items-center space-x-3 mb-4">
                    <Badge 
                      variant={projectToView?.type === 'freelance' ? 'default' : 'secondary'}
                      className={`text-sm px-3 py-1 ${
                        projectToView?.type === 'freelance' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg' 
                          : 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg'
                      }`}
                    >
                      {projectToView?.type === 'freelance' ? (
                        <>
                          <Wrench className="w-4 h-4 mr-2" />
                          Serviço de Engenharia
                        </>
                      ) : (
                        <>
                          <Briefcase className="w-4 h-4 mr-2" />
                          Emprego
                        </>
                      )}
                    </Badge>
                    <Badge 
                      variant={projectToView?.status === 'open' ? 'default' : 'secondary'}
                      className={`text-sm px-3 py-1 ${projectToView?.status === 'open' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}`}
                    >
                      {projectToView?.status === 'open' ? 'Aberto' : 'Fechado'}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowProjectDetails(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </DialogHeader>

            {projectToView && (
              <div className="space-y-8">
                {/* Informações da Empresa - REDESENHADO */}
                <Card className="w-full bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white flex items-center text-xl">
                      <Building2 className="w-6 h-6 mr-3 text-red-500" />
                      Sobre a Empresa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/30">
                          <div className="space-y-2">
                            <span className="text-gray-400 text-sm font-medium block">Nome da Empresa</span>
                            <span className="text-white font-semibold text-lg block break-words">{projectToView.company.companyName}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/30">
                          <div className="space-y-2">
                            <span className="text-gray-400 text-sm font-medium block">Localização</span>
                            <span className="text-white flex items-center break-words">
                              <MapPin className="w-4 h-4 mr-2 text-red-400 shrink-0" />
                              {projectToView.company.location}
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/30">
                          <div className="space-y-2">
                            <span className="text-gray-400 text-sm font-medium block">Porte da Empresa</span>
                            <span className="text-white capitalize break-words">
                              {projectToView.company.size === 'small' ? 'Pequena' : 
                               projectToView.company.size === 'medium' ? 'Média' : 'Grande'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectToView.company.website && (
                          <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/30">
                            <div className="space-y-2">
                              <span className="text-gray-400 text-sm font-medium block">Website</span>
                              <a 
                                href={projectToView.company.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-red-400 hover:text-red-300 transition-colors font-medium break-all"
                              >
                                {projectToView.company.website}
                              </a>
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-gray-900/40 rounded-lg p-4 border border-gray-700/30">
                          <div className="space-y-2">
                            <span className="text-gray-400 text-sm font-medium block">Sobre a Empresa</span>
                            <p className="text-white leading-relaxed text-sm">{projectToView.company.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detalhes do Projeto - COMPLETAMENTE REDESENHADO */}
                <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white flex items-center text-xl">
                      <Eye className="w-6 h-6 mr-3 text-red-500" />
                      Detalhes do Projeto
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {/* Descrição Completa - MELHORADA */}
                      <div>
                        <h4 className="text-white font-semibold mb-4 flex items-center text-lg">
                          <FileText className="w-5 h-5 mr-3 text-red-400" />
                          Descrição Completa
                        </h4>
                        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-gray-700/40 backdrop-blur-sm">
                          <p className="text-white leading-relaxed whitespace-pre-wrap break-words">{projectToView.description}</p>
                        </div>
                      </div>

                      {/* Grid de Informações - REDESENHADO */}
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <h5 className="text-gray-300 font-medium text-sm uppercase tracking-wide mb-3">Localização & Modalidade</h5>
                          
                          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg p-4 border border-gray-700/30">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-red-400" />
                              </div>
                              <div>
                                <span className="text-gray-400 text-xs block">Localização</span>
                                <span className="text-white font-medium">{projectToView.location}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg p-4 border border-gray-700/30">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-blue-400" />
                              </div>
                              <div>
                                <span className="text-gray-400 text-xs block">Modalidade</span>
                                <span className="text-white font-medium">{projectToView.remote ? 'Remoto' : 'Presencial'}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h5 className="text-gray-300 font-medium text-sm uppercase tracking-wide mb-3">Orçamento & Prazo</h5>
                          
                          {projectToView.budget && (
                            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg p-4 border border-gray-700/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                                  <DollarSign className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                  <span className="text-gray-400 text-xs block">Orçamento</span>
                                  <span className="text-white font-semibold">
                                    {formatCurrency(projectToView.budget.min)} - {formatCurrency(projectToView.budget.max)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {projectToView.deadline && (
                            <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg p-4 border border-gray-700/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                                  <Clock className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div>
                                  <span className="text-gray-400 text-xs block">Prazo</span>
                                  <span className="text-white font-medium">{formatDate(projectToView.deadline)}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <h5 className="text-gray-300 font-medium text-sm uppercase tracking-wide mb-3">Informações Gerais</h5>
                          
                          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg p-4 border border-gray-700/30">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-purple-400" />
                              </div>
                              <div>
                                <span className="text-gray-400 text-xs block">Publicado em</span>
                                <span className="text-white font-medium">{formatDate(projectToView.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-lg p-4 border border-gray-700/30">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-orange-400" />
                              </div>
                              <div>
                                <span className="text-gray-400 text-xs block">Propostas</span>
                                <span className="text-white font-medium">{projectToView.proposals?.length || 0} recebidas</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Habilidades Necessárias - MELHORADO */}
                      <div>
                        <h4 className="text-white font-semibold mb-4 flex items-center text-lg">
                          <Target className="w-5 h-5 mr-3 text-red-400" />
                          Habilidades Necessárias
                        </h4>
                        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-6 border border-gray-700/40">
                          <div className="flex flex-wrap gap-3">
                            {projectToView.skills.map((skill) => (
                              <Badge 
                                key={skill} 
                                variant="outline" 
                                className="border-gray-600/50 text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 transition-colors px-3 py-1 text-sm"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Ações - MELHORADAS COM CORES CONDICIONAIS */}
                <div className="flex space-x-4 pt-6 border-t border-gray-700/50">
                  {projectToView.type === 'clt' ? (
                    <Button 
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 shadow-lg hover:shadow-green-500/25 transition-all"
                      onClick={() => handleOpenApplicationForm(projectToView)}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Participar da Vaga
                    </Button>
                  ) : (
                    <Button 
                      size="lg"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 shadow-lg hover:shadow-blue-500/25 transition-all"
                      onClick={() => {
                        setSelectedProject(projectToView);
                        setShowProjectDetails(false);
                        setShowSendProposal(true);
                      }}
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Enviar Proposta
                    </Button>
                  )}
                  <Button 
                    size="lg"
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8"
                    onClick={() => setShowProjectDetails(false)}
                  >
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">EngConnect</span>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
                onClick={() => setAppState('login')}
              >
                Entrar
              </Button>
              <Button 
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 shadow-lg hover:shadow-red-500/25 transition-all"
                onClick={() => setAppState('signup')}
              >
                Cadastrar
              </Button>
            </div>
            {/* Mobile menu button */}
            <div className="sm:hidden">
              <Button variant="ghost" size="sm" className="text-gray-300">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - SEÇÃO MELHORADA E MAIS COMPACTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          {/* Premium Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-700/50 backdrop-blur-sm hover:scale-105 transition-transform">
              <Target className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-red-300 text-sm font-semibold">🎯 Oportunidades Premium de Engenharia</span>
            </div>
          </div>
          
          {/* Main Heading - MAIS COMPACTO */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Conecte-se com os
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              Melhores Engenheiros
            </span>
          </h1>
          
          {/* Subtitle - MAIS DIRETO */}
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            A plataforma que une empresas com 
            <span className="text-red-400 font-semibold"> soluções de engenharia </span>
            e profissionais qualificados.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-12">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-red-500/25 transition-all"
              onClick={() => setAppState('signup')}
            >
              Começar Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800/50 px-8 py-4 text-lg transition-all"
              onClick={() => setAppState('login')}
            >
              Já tenho conta
            </Button>
          </div>

          {/* Stats Compactos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50 hover:border-red-500/30 transition-all">
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-gray-400 text-sm">Engenheiros</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50 hover:border-red-500/30 transition-all">
              <div className="text-2xl font-bold text-white mb-1">200+</div>
              <div className="text-gray-400 text-sm">Empresas</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50 hover:border-red-500/30 transition-all">
              <div className="text-2xl font-bold text-white mb-1">1.2k+</div>
              <div className="text-gray-400 text-sm">Projetos</div>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800/50 hover:border-red-500/30 transition-all">
              <div className="text-2xl font-bold text-white mb-1">4.8★</div>
              <div className="text-gray-400 text-sm">Avaliação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA Section */}
      <section className="py-8 px-4 sm:hidden bg-black/50">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">Pronto para começar?</p>
          <div className="flex flex-col space-y-3">
            <Button 
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
              onClick={() => setAppState('signup')}
            >
              Cadastrar Grátis
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={() => setAppState('login')}
            >
              Entrar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

interface CompanyDashboardProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onCreateProject: () => void;
  proposals: Proposal[];
  onUpdateProposalStatus: (proposalId: string, status: ProposalStatus, feedback?: string) => void;
}

function CompanyDashboard({ searchTerm, setSearchTerm, onCreateProject, proposals, onUpdateProposalStatus }: CompanyDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // FUNÇÃO DE BUSCA CORRIGIDA PARA ENGENHEIROS
  const handleSearchEngineers = () => {
    if (!searchTerm.trim()) {
      return mockEngineers;
    }
    
    return mockEngineers.filter(engineer => 
      engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const filteredEngineers = handleSearchEngineers();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Dashboard da Empresa
        </h1>
        <p className="text-gray-300 text-lg">
          Gerencie seus projetos e encontre os melhores engenheiros
        </p>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">Visão Geral</TabsTrigger>
          <TabsTrigger value="engineers" className="data-[state=active]:bg-red-600">Engenheiros</TabsTrigger>
          <TabsTrigger value="proposals" className="data-[state=active]:bg-red-600">Propostas</TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-red-600">Projetos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-red-500" />
                  Novo Projeto
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Publique um projeto e receba propostas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={onCreateProject}
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                >
                  Criar Projeto
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-red-500" />
                  Buscar Talentos
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Encontre profissionais qualificados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={() => setActiveTab('engineers')}
                >
                  Explorar Engenheiros
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-red-500" />
                  Propostas
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {proposals.length} propostas recebidas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={() => setActiveTab('proposals')}
                >
                  Gerenciar Propostas
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-white mb-1">3</div>
                <div className="text-sm text-gray-400">Projetos Ativos</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-white mb-1">{proposals.length}</div>
                <div className="text-sm text-gray-400">Propostas Recebidas</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-white mb-1">12</div>
                <div className="text-sm text-gray-400">Projetos Concluídos</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-white mb-1">4.7★</div>
                <div className="text-sm text-gray-400">Avaliação Média</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engineers" className="space-y-6 mt-6">
          {/* Search Engineers */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Encontrar Engenheiros</CardTitle>
              <CardDescription className="text-gray-400">
                Busque profissionais por especialidade, localização ou disponibilidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar por especialidade, localização..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <Button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEngineers.map((engineer) => (
                  <Card key={engineer.id} className="bg-gray-800/50 border-gray-600">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-red-600 text-white">
                              {engineer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-white text-lg">{engineer.name}</CardTitle>
                            <CardDescription className="text-gray-400">{engineer.title}</CardDescription>
                          </div>
                        </div>
                        <Badge 
                          variant={engineer.availability === 'available' ? 'default' : 'secondary'}
                          className={engineer.availability === 'available' ? 'bg-green-600' : 'bg-yellow-600'}
                        >
                          {engineer.availability === 'available' ? 'Disponível' : 'Ocupado'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Experiência:</span>
                        <span className="text-white">{engineer.experience} anos</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Valor/hora:</span>
                        <span className="text-white">{formatCurrency(engineer.hourlyRate || 0)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Avaliação:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-white">{engineer.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        {engineer.location}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {engineer.specialties.slice(0, 2).map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900">
                        Ver Perfil Completo
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Mensagem quando não há resultados */}
              {filteredEngineers.length === 0 && searchTerm && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-white text-lg font-medium mb-2">
                    Nenhum engenheiro encontrado
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Não encontramos engenheiros que correspondam à sua busca por "{searchTerm}".
                  </p>
                  <Button 
                    onClick={() => setSearchTerm('')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Limpar Busca
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposals" className="space-y-6 mt-6">
          <ProposalManagement 
            proposals={proposals}
            onUpdateStatus={onUpdateProposalStatus}
          />
        </TabsContent>

        <TabsContent value="projects" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Meus Projetos</h2>
            <Button 
              onClick={onCreateProject}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Projeto
            </Button>
          </div>
          
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">Seus projetos aparecerão aqui</h3>
            <p className="text-gray-400 mb-4">
              Crie seu primeiro projeto para começar a receber propostas de engenheiros qualificados.
            </p>
            <Button 
              onClick={onCreateProject}
              className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
            >
              Criar Primeiro Projeto
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface EngineerDashboardProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  projects: Project[];
  onSendProposal: (project: Project) => void;
  onViewDetails: (project: Project) => void;
}

function EngineerDashboard({ searchTerm, setSearchTerm, projects, onSendProposal, onViewDetails }: EngineerDashboardProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'freelance' | 'clt'>('all');

  // FUNÇÃO DE BUSCA CORRIGIDA PARA PROJETOS
  const handleSearchProjects = () => {
    let filtered = projects;

    // Aplicar filtro de tipo primeiro
    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => project.type === activeFilter);
    }

    // Aplicar busca por termo se existir
    if (searchTerm.trim()) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered;
  };

  const filteredProjects = handleSearchProjects();

  return (
    <div className="space-y-8">
      {/* Welcome Section - ELEMENTO MODIFICADO - MAIS COMPACTO E MINIMALISTA */}
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Premium Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-700/50 backdrop-blur-sm hover:scale-105 transition-transform">
              <Target className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-red-300 text-sm font-semibold">🎯 Oportunidades Premium de Engenharia</span>
            </div>
          </div>
          
          {/* Main Heading - MAIS COMPACTO */}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            Encontre Oportunidades
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              Incríveis
            </span>
          </h1>
          
          {/* Subtitle - MAIS DIRETO */}
          <p className="text-lg text-gray-200 mb-6 font-light leading-relaxed">
            Descubra projetos de 
            <span className="text-red-400 font-semibold"> serviços de engenharia </span>
            e 
            <span className="text-green-400 font-semibold"> empregos </span>
            que combinam com seu perfil
          </p>
        </div>
      </div>

      {/* Quick Stats - Versão Minimalista */}
      <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">12</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Propostas Enviadas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">3</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Em Análise</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">8</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Projetos Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">4.9★</div>
            <div className="text-xs text-gray-400 uppercase tracking-wide">Sua Avaliação</div>
          </div>
        </div>
      </div>

      {/* Search Projects */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Oportunidades Disponíveis</CardTitle>
          <CardDescription className="text-gray-400">
            Encontre serviços de jardinagem e empregos que combinam com seu perfil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Buscar projetos por título, tecnologia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>

          {/* FILTROS MELHORADOS - ELEMENTO MODIFICADO */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center">
                <Filter className="w-4 h-4 mr-2 text-red-400" />
                Filtrar Oportunidades
              </h3>
              <span className="text-sm text-gray-400">
                {filteredProjects.length} de {projects.length} projetos
              </span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-500/25 scale-105'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  activeFilter === 'all' ? 'bg-white' : 'bg-gray-500'
                }`}></div>
                <span>Todos</span>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                  {projects.length}
                </Badge>
              </button>
              
              <button
                onClick={() => setActiveFilter('freelance')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeFilter === 'freelance'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/25 scale-105'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>Serviços de Engenharia</span>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                  {projects.filter(p => p.type === 'freelance').length}
                </Badge>
              </button>
              
              <button
                onClick={() => setActiveFilter('clt')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeFilter === 'clt'
                    ? 'bg-gradient-to-r from-green-600 to-green-800 text-white shadow-lg shadow-green-500/25 scale-105'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Empregos</span>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                  {projects.filter(p => p.type === 'clt').length}
                </Badge>
              </button>
            </div>
          </div>

          {/* Lista de Projetos Filtrados - CARDS MINIMALISTAS COM CORES CONDICIONAIS */}
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-white text-lg font-medium mb-2">
                  {searchTerm ? 'Nenhum projeto encontrado' : 'Nenhum projeto disponível'}
                </h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm 
                    ? `Não encontramos projetos que correspondam à sua busca por "${searchTerm}".`
                    : 'Não há projetos disponíveis para o filtro selecionado.'
                  }
                </p>
                <div className="flex justify-center space-x-3">
                  {searchTerm && (
                    <Button 
                      onClick={() => setSearchTerm('')}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Limpar Busca
                    </Button>
                  )}
                  <Button 
                    onClick={() => setActiveFilter('all')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Ver Todos os Projetos
                  </Button>
                </div>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div key={project.id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 hover:border-gray-600/50 transition-all hover:bg-gray-800/40">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-white font-semibold text-lg truncate">{project.title}</h3>
                        <Badge 
                          variant={project.type === 'freelance' ? 'default' : 'secondary'}
                          className={`shrink-0 ${
                            project.type === 'freelance' 
                              ? 'bg-blue-600/20 text-blue-300 border-blue-500/30' 
                              : 'bg-green-600/20 text-green-300 border-green-500/30'
                          }`}
                        >
                          {project.type === 'freelance' ? (
                            <>
                              <Wrench className="w-3 h-3 mr-1" />
                              Serviço
                            </>
                          ) : (
                            <>
                              <Briefcase className="w-3 h-3 mr-1" />
                              Emprego
                            </>
                          )}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Building2 className="w-3 h-3 mr-1" />
                          {project.company.companyName}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {project.location}
                        </div>
                        {project.budget && (
                          <div className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs border-gray-600/50 text-gray-400 bg-gray-800/30">
                            {skill}
                          </Badge>
                        ))}
                        {project.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs border-gray-600/50 text-gray-400 bg-gray-800/30">
                            +{project.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4 shrink-0">
                      <Button 
                        size="sm"
                        className={`inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground shadow-xs h-8 rounded-md gap-1.5 has-[>svg]:px-2.5 text-xs px-3 py-1 ${
                          project.type === 'clt' 
                            ? 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900' 
                            : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'
                        }`}
                        onClick={() => onSendProposal(project)}
                      >
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {project.type === 'clt' ? 'Enviar Currículo' : 'Proposta'}
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline" 
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs px-3 py-1"
                        onClick={() => onViewDetails(project)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}