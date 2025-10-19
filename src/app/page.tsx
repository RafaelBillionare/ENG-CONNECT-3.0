'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Filter
} from 'lucide-react';

// Mock data
const mockProjects = [
  {
    id: '1',
    title: 'Sistema de Automação Industrial',
    description: 'Desenvolvimento de sistema de controle para linha de produção automatizada com sensores IoT e interface web.',
    type: 'freelance' as const,
    location: 'São Paulo, SP',
    budget: { min: 15000, max: 25000 },
    skills: ['Automação Industrial', 'PLC', 'SCADA', 'Python', 'IoT'],
    company: {
      name: 'TechCorp Solutions',
      size: 'medium' as const,
    },
    status: 'open' as const,
    remote: false,
    createdAt: new Date('2024-01-20'),
    proposals: 12
  },
  {
    id: '2',
    title: 'Engenheiro Civil - Obras Residenciais',
    description: 'Vaga para engenheiro civil com experiência em projetos residenciais e acompanhamento de obras.',
    type: 'clt' as const,
    location: 'Rio de Janeiro, RJ',
    skills: ['Engenharia Civil', 'AutoCAD', 'Projetos Estruturais', 'Gestão de Obras'],
    company: {
      name: 'Construtora Alpha',
      size: 'large' as const,
    },
    status: 'open' as const,
    remote: false,
    createdAt: new Date('2024-01-18'),
    proposals: 8
  }
];

const mockEngineers = [
  {
    id: '1',
    name: 'Carlos Silva',
    title: 'Engenheiro de Automação',
    experience: 8,
    specialties: ['Automação Industrial', 'PLC', 'SCADA'],
    location: 'São Paulo, SP',
    rating: 4.9,
    hourlyRate: 120,
    availability: 'available' as const
  }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

type AppState = 'landing' | 'login' | 'signup' | 'profile-setup' | 'dashboard';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [signupData, setSignupData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = (credentials: { email: string; password: string }) => {
    const mockUser = {
      id: '1',
      name: 'João Silva',
      email: credentials.email,
      type: 'company',
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

  // Landing Page
  if (appState === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Header */}
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

        {/* Hero Section */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-800/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto text-center relative z-10 max-w-5xl">
            <div className="mb-12">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-900/20 to-red-800/20 border border-red-700/30 backdrop-blur-sm hover:scale-105 transition-transform">
                <Rocket className="w-4 h-4 text-red-400 mr-2" />
                <span className="text-red-300 font-semibold">Plataforma Premium de Engenharia</span>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
              Conecte-se com os
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                Melhores Engenheiros
              </span>
            </h1>
            
            <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              A plataforma que une empresas e profissionais de engenharia 
              <span className="text-red-400 font-medium"> de forma simples e eficiente</span>
            </p>

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

        {/* Features */}
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

  // Login Page
  if (appState === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-gray-900/90 border-gray-700 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Entrar no EngConnect</CardTitle>
            <CardDescription className="text-gray-400">
              Acesse sua conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Email</label>
              <Input 
                type="email" 
                placeholder="seu@email.com"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Senha</label>
              <Input 
                type="password" 
                placeholder="••••••••"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
              onClick={() => handleLogin({ email: 'test@test.com', password: '123' })}
            >
              Entrar
            </Button>
            <div className="text-center">
              <Button 
                variant="link" 
                className="text-gray-400 hover:text-white"
                onClick={() => setAppState('signup')}
              >
                Não tem conta? Cadastre-se
              </Button>
            </div>
            <div className="text-center">
              <Button 
                variant="link" 
                className="text-gray-500 hover:text-gray-400"
                onClick={() => setAppState('landing')}
              >
                ← Voltar ao início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Signup Page
  if (appState === 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-gray-900/90 border-gray-700 backdrop-blur-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Criar Conta</CardTitle>
            <CardDescription className="text-gray-400">
              Junte-se à maior plataforma de engenharia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Nome Completo</label>
              <Input 
                placeholder="Seu nome completo"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Email</label>
              <Input 
                type="email" 
                placeholder="seu@email.com"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Senha</label>
              <Input 
                type="password" 
                placeholder="••••••••"
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
              onClick={() => handleSignup({ name: 'Test User', email: 'test@test.com', password: '123' })}
            >
              Criar Conta
            </Button>
            <div className="text-center">
              <Button 
                variant="link" 
                className="text-gray-400 hover:text-white"
                onClick={() => setAppState('login')}
              >
                Já tem conta? Entre aqui
              </Button>
            </div>
            <div className="text-center">
              <Button 
                variant="link" 
                className="text-gray-500 hover:text-gray-400"
                onClick={() => setAppState('landing')}
              >
                ← Voltar ao início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Profile Setup
  if (appState === 'profile-setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl bg-gray-900/90 border-gray-700 backdrop-blur-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Complete seu Perfil</CardTitle>
            <CardDescription className="text-gray-400">
              Nos conte mais sobre você para personalizar sua experiência
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Card 
                className="p-6 cursor-pointer border-2 border-gray-700 hover:border-red-500 transition-colors bg-gray-800/50"
                onClick={() => handleProfileComplete({ ...signupData, type: 'engineer' })}
              >
                <div className="text-center">
                  <Wrench className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Sou Engenheiro</h3>
                  <p className="text-gray-400 text-sm">
                    Quero encontrar projetos e oportunidades de trabalho
                  </p>
                </div>
              </Card>
              <Card 
                className="p-6 cursor-pointer border-2 border-gray-700 hover:border-red-500 transition-colors bg-gray-800/50"
                onClick={() => handleProfileComplete({ ...signupData, type: 'company' })}
              >
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Sou Empresa</h3>
                  <p className="text-gray-400 text-sm">
                    Quero contratar engenheiros para meus projetos
                  </p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-gray-900">EngConnect</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-sm text-gray-700">{currentUser?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo, {currentUser?.name}!
          </h1>
          <p className="text-gray-600">
            {currentUser?.type === 'engineer' 
              ? 'Encontre projetos incríveis para trabalhar'
              : 'Encontre os melhores engenheiros para seus projetos'
            }
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={currentUser?.type === 'engineer' ? 'Buscar projetos...' : 'Buscar engenheiros...'}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue={currentUser?.type === 'engineer' ? 'projects' : 'engineers'} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">
              {currentUser?.type === 'engineer' ? 'Projetos Disponíveis' : 'Meus Projetos'}
            </TabsTrigger>
            <TabsTrigger value="engineers">
              {currentUser?.type === 'engineer' ? 'Meu Perfil' : 'Engenheiros'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentUser?.type === 'engineer' ? 'Projetos Disponíveis' : 'Meus Projetos'}
              </h2>
              {currentUser?.type === 'company' && (
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Projeto
                </Button>
              )}
            </div>

            <div className="grid gap-6">
              {mockProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge 
                            variant={project.type === 'freelance' ? 'default' : 'secondary'}
                            className={project.type === 'freelance' ? 'bg-blue-600' : 'bg-green-600'}
                          >
                            {project.type === 'freelance' ? 'Freelance' : 'CLT'}
                          </Badge>
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {project.status === 'open' ? 'Aberto' : 'Fechado'}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <span className="flex items-center">
                            <Building2 className="w-4 h-4 mr-1" />
                            {project.company.name}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {project.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDate(project.createdAt)}
                          </span>
                        </div>
                      </div>
                      {project.budget && (
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600">
                            {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {project.proposals} propostas
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {project.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.skills.length - 4} mais
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      {currentUser?.type === 'engineer' && (
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Enviar Proposta
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="engineers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentUser?.type === 'engineer' ? 'Meu Perfil' : 'Engenheiros Disponíveis'}
              </h2>
            </div>

            {currentUser?.type === 'engineer' ? (
              <Card>
                <CardHeader>
                  <CardTitle>Perfil do Engenheiro</CardTitle>
                  <CardDescription>
                    Mantenha seu perfil atualizado para receber mais oportunidades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">
                        {currentUser?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{currentUser?.name}</h3>
                      <p className="text-gray-600">Engenheiro</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">4.8 (12 avaliações)</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Especialidades</label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <Badge variant="outline">Automação Industrial</Badge>
                        <Badge variant="outline">PLC</Badge>
                        <Badge variant="outline">SCADA</Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Localização</label>
                      <p className="mt-1 text-gray-900">São Paulo, SP</p>
                    </div>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700">
                    Editar Perfil
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {mockEngineers.map((engineer) => (
                  <Card key={engineer.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xl font-semibold">
                              {engineer.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{engineer.name}</h3>
                            <p className="text-gray-600">{engineer.title}</p>
                            <div className="flex items-center mt-1">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span className="text-sm text-gray-600">{engineer.rating}</span>
                              <span className="text-gray-400 mx-2">•</span>
                              <span className="text-sm text-gray-600">{engineer.experience} anos</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">{engineer.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-green-600">
                            {formatCurrency(engineer.hourlyRate)}/hora
                          </div>
                          <Badge 
                            variant="outline" 
                            className="text-green-600 border-green-600 mt-1"
                          >
                            Disponível
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {engineer.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Perfil
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Contratar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}