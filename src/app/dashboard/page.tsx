'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Activity,
  PieChart,
  Target,
  Award,
  Rocket,
  Users,
  Briefcase,
  MessageSquare,
  DollarSign,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Settings,
  Bell,
  Home,
  ChevronRight,
  Filter,
  Download,
  Share,
  RefreshCw,
  Zap,
  Shield,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
  Wrench
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data para estatísticas
  const stats = {
    overview: {
      totalProjects: 45,
      activeProjects: 12,
      completedProjects: 28,
      totalEarnings: 185000,
      monthlyEarnings: 25000,
      averageRating: 4.8,
      responseRate: 95,
      successRate: 78
    },
    applications: {
      total: 32,
      pending: 8,
      interviews: 5,
      accepted: 12,
      rejected: 7,
      successRate: 37.5
    },
    proposals: {
      total: 58,
      pending: 15,
      negotiating: 8,
      accepted: 22,
      rejected: 13,
      successRate: 37.9
    },
    performance: {
      projectsThisMonth: 8,
      projectsLastMonth: 6,
      earningsThisMonth: 25000,
      earningsLastMonth: 18500,
      ratingThisMonth: 4.9,
      ratingLastMonth: 4.7
    }
  };

  // Mock data para projetos recentes
  const recentProjects = [
    {
      id: 1,
      title: 'Sistema de Estruturas Metálicas',
      client: 'TechCorp Solutions',
      status: 'completed',
      value: 15000,
      date: '2024-01-15',
      rating: 5
    },
    {
      id: 2,
      title: 'Análise Estrutural de Edifício',
      client: 'Construtora ABC',
      status: 'in-progress',
      value: 22000,
      date: '2024-01-10',
      rating: null
    },
    {
      id: 3,
      title: 'Projeto de Fundações',
      client: 'BuildMax',
      status: 'pending',
      value: 18000,
      date: '2024-01-08',
      rating: null
    }
  ];

  // Mock data para atividades recentes
  const recentActivities = [
    {
      id: 1,
      type: 'project_completed',
      title: 'Projeto "Sistema de Estruturas" foi concluído',
      time: '2 horas atrás',
      icon: CheckCircle,
      color: 'text-green-400'
    },
    {
      id: 2,
      type: 'proposal_sent',
      title: 'Nova proposta enviada para "Análise Estrutural"',
      time: '5 horas atrás',
      icon: MessageSquare,
      color: 'text-blue-400'
    },
    {
      id: 3,
      type: 'payment_received',
      title: 'Pagamento de R$ 15.000 recebido',
      time: '1 dia atrás',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      id: 4,
      type: 'interview_scheduled',
      title: 'Entrevista agendada para "Engenheiro Sênior"',
      time: '2 dias atrás',
      icon: Calendar,
      color: 'text-yellow-400'
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600';
      case 'in-progress':
        return 'bg-blue-600';
      case 'pending':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in-progress':
        return 'Em Andamento';
      case 'pending':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EngConnect</span>
              </Link>
              
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Home className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Dashboard</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Settings className="w-4 h-4" />
              </Button>
              
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-red-600 text-white text-sm">
                  JS
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Meu Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Acompanhe seu desempenho e gerencie suas atividades
              </p>
            </div>
            
            {/* Time Range Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Período:</span>
              <div className="flex bg-gray-800 rounded-lg p-1">
                {[
                  { value: '7d', label: '7 dias' },
                  { value: '30d', label: '30 dias' },
                  { value: '90d', label: '90 dias' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTimeRange(option.value)}
                    className={`px-3 py-1 rounded-md text-sm transition-all ${
                      timeRange === option.value
                        ? 'bg-red-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-red-600">
              <Briefcase className="w-4 h-4 mr-2" />
              Projetos
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-red-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-red-600">
              <PieChart className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-700/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-300 flex items-center text-sm font-medium">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Ganhos Totais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">
                    {formatCurrency(stats.overview.totalEarnings)}
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowUp className="w-3 h-3 text-green-400 mr-1" />
                    <span className="text-green-400">+12.5%</span>
                    <span className="text-gray-400 ml-1">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-700/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-300 flex items-center text-sm font-medium">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Projetos Ativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stats.overview.activeProjects}
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowUp className="w-3 h-3 text-blue-400 mr-1" />
                    <span className="text-blue-400">+3</span>
                    <span className="text-gray-400 ml-1">novos este mês</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-700/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-purple-300 flex items-center text-sm font-medium">
                    <Star className="w-4 h-4 mr-2" />
                    Avaliação Média
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stats.overview.averageRating}★
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowUp className="w-3 h-3 text-purple-400 mr-1" />
                    <span className="text-purple-400">+0.2</span>
                    <span className="text-gray-400 ml-1">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/40 to-orange-800/40 border-orange-700/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-orange-300 flex items-center text-sm font-medium">
                    <Target className="w-4 h-4 mr-2" />
                    Taxa de Sucesso
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stats.overview.successRate}%
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowUp className="w-3 h-3 text-orange-400 mr-1" />
                    <span className="text-orange-400">+5.2%</span>
                    <span className="text-gray-400 ml-1">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Earnings Chart */}
              <Card className="bg-gray-800/40 border-gray-700/60">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                    Evolução dos Ganhos
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Últimos 6 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: 'Jan', value: 15000, growth: 8 },
                      { month: 'Fev', value: 18500, growth: 23 },
                      { month: 'Mar', value: 22000, growth: 19 },
                      { month: 'Abr', value: 19500, growth: -11 },
                      { month: 'Mai', value: 25000, growth: 28 },
                      { month: 'Jun', value: 28000, growth: 12 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400 w-8">{item.month}</span>
                          <div className="flex-1">
                            <div className="bg-gray-700 rounded-full h-2 w-32">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                                style={{ width: `${(item.value / 30000) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {formatCurrency(item.value)}
                          </div>
                          <div className={`text-xs flex items-center ${
                            item.growth > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {item.growth > 0 ? (
                              <ArrowUp className="w-3 h-3 mr-1" />
                            ) : (
                              <ArrowDown className="w-3 h-3 mr-1" />
                            )}
                            {Math.abs(item.growth)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card className="bg-gray-800/40 border-gray-700/60">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-500" />
                    Atividades Recentes
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Últimas atualizações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center shrink-0`}>
                          <activity.icon className={`w-4 h-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm">{activity.title}</p>
                          <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-800">
                    Ver Todas as Atividades
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-gray-800/40 border-gray-700/60">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 h-12">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Nova Proposta
                  </Button>
                  <Button className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 h-12">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Buscar Projetos
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 h-12">
                    <Edit className="w-4 h-4 mr-2" />
                    Atualizar Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project Stats */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-gray-800/40 border-gray-700/60">
                  <CardHeader>
                    <CardTitle className="text-white">Estatísticas de Projetos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Total de Projetos</span>
                      <span className="text-white font-bold">{stats.overview.totalProjects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Projetos Ativos</span>
                      <span className="text-blue-400 font-bold">{stats.overview.activeProjects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Concluídos</span>
                      <span className="text-green-400 font-bold">{stats.overview.completedProjects}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Taxa de Conclusão</span>
                        <span className="text-white font-bold">
                          {Math.round((stats.overview.completedProjects / stats.overview.totalProjects) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(stats.overview.completedProjects / stats.overview.totalProjects) * 100} 
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/40 border-gray-700/60">
                  <CardHeader>
                    <CardTitle className="text-white">Ganhos por Projeto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        {formatCurrency(stats.overview.totalEarnings / stats.overview.completedProjects)}
                      </div>
                      <p className="text-gray-400 text-sm">Valor médio por projeto</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Projects */}
              <div className="lg:col-span-2">
                <Card className="bg-gray-800/40 border-gray-700/60">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span>Projetos Recentes</span>
                      <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Todos
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProjects.map((project) => (
                        <div key={project.id} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-white font-semibold mb-1">{project.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <div className="flex items-center">
                                  <Building2 className="w-3 h-3 mr-1" />
                                  {project.client}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {formatDate(project.date)}
                                </div>
                              </div>
                            </div>
                            <Badge className={getStatusColor(project.status)}>
                              {getStatusText(project.status)}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-green-400 font-semibold">
                              {formatCurrency(project.value)}
                            </div>
                            {project.rating && (
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-white">{project.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-800/40 border-gray-700/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Projetos Este Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.performance.projectsThisMonth}
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowUp className="w-3 h-3 text-green-400 mr-1" />
                    <span className="text-green-400">
                      +{stats.performance.projectsThisMonth - stats.performance.projectsLastMonth}
                    </span>
                    <span className="text-gray-400 ml-1">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/40 border-gray-700/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Ganhos Este Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">
                    {formatCurrency(stats.performance.earningsThisMonth)}
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowUp className="w-3 h-3 text-green-400 mr-1" />
                    <span className="text-green-400">
                      +{Math.round(((stats.performance.earningsThisMonth - stats.performance.earningsLastMonth) / stats.performance.earningsLastMonth) * 100)}%
                    </span>
                    <span className="text-gray-400 ml-1">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/40 border-gray-700/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Avaliação Atual</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.performance.ratingThisMonth}★
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowUp className="w-3 h-3 text-green-400 mr-1" />
                    <span className="text-green-400">
                      +{(stats.performance.ratingThisMonth - stats.performance.ratingLastMonth).toFixed(1)}
                    </span>
                    <span className="text-gray-400 ml-1">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/40 border-gray-700/60">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-sm">Taxa de Resposta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stats.overview.responseRate}%
                  </div>
                  <div className="flex items-center text-sm">
                    <ArrowUp className="w-3 h-3 text-green-400 mr-1" />
                    <span className="text-green-400">+2%</span>
                    <span className="text-gray-400 ml-1">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/40 border-gray-700/60">
                <CardHeader>
                  <CardTitle className="text-white">Candidaturas vs Propostas</CardTitle>
                  <CardDescription className="text-gray-400">
                    Comparativo de performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Candidaturas</span>
                      <span className="text-white">{stats.applications.successRate}% sucesso</span>
                    </div>
                    <Progress value={stats.applications.successRate} className="h-3" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Propostas</span>
                      <span className="text-white">{stats.proposals.successRate}% sucesso</span>
                    </div>
                    <Progress value={stats.proposals.successRate} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/40 border-gray-700/60">
                <CardHeader>
                  <CardTitle className="text-white">Metas do Mês</CardTitle>
                  <CardDescription className="text-gray-400">
                    Progresso das suas metas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Ganhos (Meta: R$ 30.000)</span>
                      <span className="text-white">83%</span>
                    </div>
                    <Progress value={83} className="h-3" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Projetos (Meta: 10)</span>
                      <span className="text-white">80%</span>
                    </div>
                    <Progress value={80} className="h-3" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Avaliação (Meta: 4.8★)</span>
                      <span className="text-white">100%</span>
                    </div>
                    <Progress value={100} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Applications Analytics */}
              <Card className="bg-gray-800/40 border-gray-700/60">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-green-500" />
                    Análise de Candidaturas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{stats.applications.total}</div>
                      <div className="text-xs text-gray-400">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{stats.applications.accepted}</div>
                      <div className="text-xs text-gray-400">Aceitas</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Pendentes</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${(stats.applications.pending / stats.applications.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm w-8">{stats.applications.pending}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Entrevistas</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(stats.applications.interviews / stats.applications.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm w-8">{stats.applications.interviews}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Rejeitadas</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${(stats.applications.rejected / stats.applications.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm w-8">{stats.applications.rejected}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Taxa de Sucesso</span>
                      <span className="text-green-400 font-bold">{stats.applications.successRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Proposals Analytics */}
              <Card className="bg-gray-800/40 border-gray-700/60">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-blue-500" />
                    Análise de Propostas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{stats.proposals.total}</div>
                      <div className="text-xs text-gray-400">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{stats.proposals.accepted}</div>
                      <div className="text-xs text-gray-400">Aceitas</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Pendentes</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${(stats.proposals.pending / stats.proposals.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm w-8">{stats.proposals.pending}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Negociando</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${(stats.proposals.negotiating / stats.proposals.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm w-8">{stats.proposals.negotiating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Rejeitadas</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${(stats.proposals.rejected / stats.proposals.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm w-8">{stats.proposals.rejected}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Taxa de Sucesso</span>
                      <span className="text-blue-400 font-bold">{stats.proposals.successRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights and Recommendations */}
            <Card className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-gray-700/60">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-red-500" />
                  Insights e Recomendações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-blue-900/30 border border-blue-700/60 rounded-xl p-6">
                    <h4 className="text-blue-300 font-bold mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Pontos Fortes
                    </h4>
                    <ul className="space-y-2 text-gray-200">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Alta taxa de resposta (95%)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Excelente avaliação média (4.8★)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Crescimento consistente nos ganhos
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-900/30 border border-orange-700/60 rounded-xl p-6">
                    <h4 className="text-orange-300 font-bold mb-3 flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      Oportunidades de Melhoria
                    </h4>
                    <ul className="space-y-2 text-gray-200">
                      <li className="flex items-center">
                        <AlertCircle className="w-4 h-4 text-orange-400 mr-2" />
                        Aumentar taxa de sucesso em candidaturas
                      </li>
                      <li className="flex items-center">
                        <AlertCircle className="w-4 h-4 text-orange-400 mr-2" />
                        Diversificar tipos de projetos
                      </li>
                      <li className="flex items-center">
                        <AlertCircle className="w-4 h-4 text-orange-400 mr-2" />
                        Melhorar tempo de resposta
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}