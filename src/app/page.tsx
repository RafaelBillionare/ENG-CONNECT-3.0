'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
  User,
  BarChart3,
  Send,
  LogOut,
  Edit
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

  // NOVA FUNÇÃO: Enviar currículo do candidato para o painel da empresa
  const handleSubmitApplication = () => {
    if (selectedFile && projectToView) {
      // Criar nova proposta com dados do currículo do engenheiro
      const curriculumProposal: Proposal = {
        id: Date.now().toString(),
        projectId: projectToView.id,
        project: projectToView,
        engineer: selectedEngineer,
        message: `Candidatura para a vaga: ${projectToView.title}`,
        budget: projectToView.budget?.min || 0,
        timeline: '30 dias',
        status: 'sent' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        attachments: [{
          name: selectedFile.name,
          url: URL.createObjectURL(selectedFile),
          type: 'pdf'
        }]
      };

      // Adicionar proposta à lista (será visível no painel da empresa)
      setProposals(prev => [curriculumProposal, ...prev]);

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
        curriculumFile: selectedFile.name,
        timestamp: new Date()
      };

      // Em produção, isso seria enviado via API para o painel da empresa
      console.log('Dados enviados para o painel da empresa:', companyNotification);

      alert(`✅ Currículo enviado com sucesso!\n\nSeus dados profissionais e o arquivo "${selectedFile.name}" foram enviados para ${projectToView.company.companyName}.\n\nO recrutador poderá visualizar:\n• Seu perfil completo\n• Experiência e especialidades\n• Currículo anexado\n• Informações de contato\n\nVocê será notificado sobre o status da sua candidatura.`);
      
      setSelectedFile(null);
      setShowProjectDetails(false);
    } else {
      alert('Por favor, selecione um arquivo PDF do seu currículo.');
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
                
                {/* Profile Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                      <Avatar>
                        <AvatarFallback className="flex size-full items-center justify-center rounded-full bg-red-600 text-white">
                          {currentUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 bg-gray-900 border-gray-700" align="end" forceMount>
                    {/* User Info Header */}
                    <div className="flex items-center space-x-3 p-4 border-b border-gray-700">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-red-600 text-white text-lg">
                          {currentUser.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate">{currentUser.name}</p>
                        <p className="text-gray-400 text-sm truncate">{currentUser.email}</p>
                        <Badge 
                          variant="outline" 
                          className="mt-1 text-xs border-red-500/30 text-red-300 bg-red-500/10"
                        >
                          {currentUser.type === 'company' ? 'Empresa' : 'Engenheiro'}
                        </Badge>
                      </div>
                    </div>

                    <DropdownMenuLabel className="text-gray-300 text-xs uppercase tracking-wide px-4 py-2">
                      Perfil & Configurações
                    </DropdownMenuLabel>
                    
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer px-4 py-3"
                      onClick={() => window.location.href = '/editar-meu-perfil'}
                    >
                      <Edit className="mr-3 h-4 w-4 text-blue-400" />
                      <div className="flex-1">
                        <div className="font-medium">Editar Perfil</div>
                        <div className="text-xs text-gray-500">Atualize suas informações pessoais</div>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer px-4 py-3">
                      <FileText className="mr-3 h-4 w-4 text-green-400" />
                      <div className="flex-1">
                        <div className="font-medium">Cadastrar Currículo</div>
                        <div className="text-xs text-gray-500">Adicione ou atualize seu currículo</div>
                      </div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer px-4 py-3">
                      <Briefcase className="mr-3 h-4 w-4 text-purple-400" />
                      <div className="flex-1">
                        <div className="font-medium">Cadastrar Portfólio</div>
                        <div className="text-xs text-gray-500">Mostre seus melhores projetos</div>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gray-700" />
                    
                    <DropdownMenuLabel className="text-gray-300 text-xs uppercase tracking-wide px-4 py-2">
                      Dashboard & Estatísticas
                    </DropdownMenuLabel>
                    
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer px-4 py-3">
                      <BarChart3 className="mr-3 h-4 w-4 text-yellow-400" />
                      <div className="flex-1">
                        <div className="font-medium">Estatísticas de Vagas</div>
                        <div className="text-xs text-gray-500">Veja suas candidaturas e resultados</div>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 text-xs">
                        12
                      </Badge>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer px-4 py-3">
                      <Send className="mr-3 h-4 w-4 text-cyan-400" />
                      <div className="flex-1">
                        <div className="font-medium">Propostas Enviadas</div>
                        <div className="text-xs text-gray-500">Acompanhe suas propostas ativas</div>
                      </div>
                      <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 text-xs">
                        8
                      </Badge>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer px-4 py-3">
                      <TrendingUp className="mr-3 h-4 w-4 text-red-400" />
                      <div className="flex-1">
                        <div className="font-medium">Meu Dashboard</div>
                        <div className="text-xs text-gray-500">Visão geral completa da sua atividade</div>
                      </div>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-gray-700" />
                    
                    <DropdownMenuItem 
                      className="text-red-300 hover:text-red-200 hover:bg-red-900/20 cursor-pointer px-4 py-3"
                      onClick={() => {
                        setCurrentUser(null);
                        setAppState('landing');
                      }}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <div className="font-medium">Sair da Conta</div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                setSelectedProject(project);
                setShowSendProposal(true);
              }}
              onViewDetails={handleViewProjectDetails}
            />
          )}
        </div>

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

        {/* Modal de Detalhes do Projeto */}
        <Dialog open={showProjectDetails} onOpenChange={setShowProjectDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <DialogTitle className="text-2xl text-white mb-2">
                    {projectToView?.title}
                  </DialogTitle>
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge 
                      variant={projectToView?.type === 'freelance' ? 'default' : 'secondary'}
                      className={`${
                        projectToView?.type === 'freelance' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white' 
                          : 'bg-gradient-to-r from-green-600 to-green-800 text-white'
                      } shadow-lg`}
                    >
                      {projectToView?.type === 'freelance' ? (
                        <>
                          <Wrench className="w-3 h-3 mr-1" />
                          Serviço de Engenharia
                        </>
                      ) : (
                        <>
                          <Briefcase className="w-3 h-3 mr-1" />
                          Emprego
                        </>
                      )}
                    </Badge>
                    <Badge 
                      variant={projectToView?.status === 'open' ? 'default' : 'secondary'}
                      className={projectToView?.status === 'open' ? 'bg-green-600' : 'bg-gray-600'}
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
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogHeader>

            {projectToView && (
              <div className="space-y-6">
                {/* Informações da Empresa */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-red-500" />
                      Sobre a Empresa
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Nome:</span>
                      <span className="text-white font-medium">{projectToView.company.companyName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Localização:</span>
                      <span className="text-white">{projectToView.company.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Porte:</span>
                      <span className="text-white capitalize">
                        {projectToView.company.size === 'small' ? 'Pequena' : 
                         projectToView.company.size === 'medium' ? 'Média' : 'Grande'}
                      </span>
                    </div>
                    {projectToView.company.website && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Website:</span>
                        <a 
                          href={projectToView.company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          {projectToView.company.website}
                        </a>
                      </div>
                    )}
                    <div className="pt-2">
                      <span className="text-gray-400 text-sm">Descrição:</span>
                      <p className="text-white mt-1">{projectToView.company.description}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Detalhes do Projeto */}
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-red-500" />
                      Detalhes do Projeto
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-gray-400 text-sm">Descrição Completa:</span>
                      <p className="text-white mt-2 leading-relaxed">{projectToView.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Localização:</span>
                          <span className="text-white flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {projectToView.location}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Trabalho Remoto:</span>
                          <span className="text-white">
                            {projectToView.remote ? 'Sim' : 'Não'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Publicado em:</span>
                          <span className="text-white flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(projectToView.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {projectToView.budget && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Orçamento:</span>
                            <span className="text-white font-semibold flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {formatCurrency(projectToView.budget.min)} - {formatCurrency(projectToView.budget.max)}
                            </span>
                          </div>
                        )}
                        {projectToView.deadline && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Prazo:</span>
                            <span className="text-white flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatDate(projectToView.deadline)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Propostas:</span>
                          <span className="text-white">
                            {projectToView.proposals?.length || 0} recebidas
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-400 text-sm">Habilidades Necessárias:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {projectToView.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="border-gray-600 text-gray-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upload de Currículo para Empregos */}
                {projectToView.type === 'clt' && (
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-green-500" />
                        Enviar Currículo
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        Para se candidatar a esta vaga, envie seu currículo em formato PDF
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="curriculum-upload"
                        />
                        <label htmlFor="curriculum-upload" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-300 mb-1">
                            {selectedFile ? selectedFile.name : 'Clique para selecionar seu currículo'}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Apenas arquivos PDF são aceitos
                          </p>
                        </label>
                      </div>
                      
                      {selectedFile && (
                        <div className="flex items-center space-x-2 p-3 bg-green-900/20 border border-green-700/50 rounded-lg">
                          <FileText className="w-4 h-4 text-green-400" />
                          <span className="text-green-300 text-sm">{selectedFile.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedFile(null)}
                            className="text-gray-400 hover:text-white ml-auto"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Ações */}
                <div className="flex space-x-4 pt-4">
                  {projectToView.type === 'clt' ? (
                    <Button 
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
                      onClick={handleSubmitApplication}
                      disabled={!selectedFile}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Candidatar-se à Vaga
                    </Button>
                  ) : (
                    <Button 
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                      onClick={() => {
                        setSelectedProject(projectToView);
                        setShowProjectDetails(false);
                        setShowSendProposal(true);
                      }}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Enviar Proposta
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
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

  // Landing Page - VERSÃO CLEAN E PREMIUM
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header Minimalista */}
      <header className="border-b border-gray-800/30 bg-black/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-xl flex items-center justify-center shadow-xl">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">EngConnect</span>
            </div>
            <div className="flex items-center space-x-3">
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
                Começar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section Premium */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-800/5 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08),transparent_70%)]"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          {/* Premium Badge */}
          <div className="mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-700/30 backdrop-blur-sm hover:scale-105 transition-transform">
              <Rocket className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-red-300 font-semibold">Plataforma Premium de Engenharia</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            Conecte-se com os
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              Melhores Engenheiros
            </span>
          </h1>
          
          {/* Subtitle Clean */}
          <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
            A plataforma que une empresas e profissionais de engenharia 
            <span className="text-red-400 font-medium"> de forma simples e eficiente</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-16">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-red-500/25 transition-all hover:scale-105"
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

          {/* Stats Minimalistas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">Engenheiros</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-gray-400">Empresas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1.2k+</div>
              <div className="text-gray-400">Projetos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">4.8★</div>
              <div className="text-gray-400">Avaliação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Premium */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-900/30 to-black/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Por que escolher o EngConnect?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A plataforma mais completa para conectar talentos em engenharia
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Conexão Rápida</h3>
              <p className="text-gray-400">
                Encontre profissionais qualificados ou oportunidades em minutos
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Segurança Total</h3>
              <p className="text-gray-400">
                Plataforma segura com verificação de perfis e pagamentos protegidos
              </p>
            </div>
            
            <div className="text-center p-8 bg-gray-900/50 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Qualidade Premium</h3>
              <p className="text-gray-400">
                Apenas profissionais e empresas verificadas fazem parte da nossa rede
              </p>
            </div>
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

  // Filtrar engenheiros baseado no termo de busca
  const filteredEngineers = mockEngineers.filter(engineer => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      engineer.name.toLowerCase().includes(searchLower) ||
      engineer.title.toLowerCase().includes(searchLower) ||
      engineer.location.toLowerCase().includes(searchLower) ||
      engineer.specialties.some(specialty => specialty.toLowerCase().includes(searchLower))
    );
  });

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

              {filteredEngineers.length === 0 && searchTerm && (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-white text-lg font-medium mb-2">Nenhum engenheiro encontrado</h3>
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

  // Filtrar projetos baseado no filtro ativo E termo de busca
  const filteredProjects = projects.filter(project => {
    // Filtro por tipo
    const typeMatch = activeFilter === 'all' || project.type === activeFilter;
    
    // Filtro por termo de busca
    if (!searchTerm) return typeMatch;
    
    const searchLower = searchTerm.toLowerCase();
    const searchMatch = (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.location.toLowerCase().includes(searchLower) ||
      project.company.companyName.toLowerCase().includes(searchLower) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchLower))
    );
    
    return typeMatch && searchMatch;
  });

  return (
    <div className="space-y-8">
      {/* Welcome Section Clean */}
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Premium Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-700/50 backdrop-blur-sm mb-6 hover:scale-105 transition-transform">
              <Target className="w-4 h-4 text-red-400 mr-2" />
              <span className="text-red-300 text-sm font-semibold">Oportunidades Premium</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Encontre Oportunidades
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
              Incríveis
            </span>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light leading-relaxed">
            Projetos de <span className="text-red-400 font-semibold">engenharia</span> e 
            <span className="text-green-400 font-semibold"> empregos</span> que combinam com seu perfil
          </p>

          {/* Stats Cards Minimalistas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-white mb-1">150+</div>
              <div className="text-xs text-gray-400">Serviços Ativos</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-white mb-1">80+</div>
              <div className="text-xs text-gray-400">Empregos</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-white mb-1">95%</div>
              <div className="text-xs text-gray-400">Taxa de Sucesso</div>
            </div>
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
              <div className="text-2xl font-bold text-red-400 mb-1">4.9★</div>
              <div className="text-xs text-gray-400">Avaliação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Minimalistas */}
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
          <CardTitle className="text-white">Projetos Disponíveis</CardTitle>
          <CardDescription className="text-gray-400">
            Encontre oportunidades que combinam com seu perfil
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

          {/* Filtros Melhorados */}
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
                <span>Serviços</span>
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

          {/* Lista de Projetos Filtrados - Cards Minimalistas */}
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  {searchTerm ? <Search className="w-8 h-8 text-gray-400" /> : <Filter className="w-8 h-8 text-gray-400" />}
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
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('all');
                  }}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  {searchTerm ? 'Limpar Busca' : 'Ver Todos os Projetos'}
                </Button>
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
                        className={`text-xs px-3 py-1 ${
                          project.type === 'freelance' 
                            ? 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900' 
                            : 'bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900'
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