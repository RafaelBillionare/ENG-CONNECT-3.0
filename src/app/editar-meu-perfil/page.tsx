'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Award,
  Plus,
  X,
  Building2,
  Calendar,
  Globe,
  Wrench
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditarMeuPerfil() {
  const router = useRouter();
  
  // Estado do formulário com dados mockados
  const [formData, setFormData] = useState({
    // Dados Pessoais
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    location: 'São Paulo, SP',
    bio: 'Engenheiro Civil com mais de 8 anos de experiência em projetos estruturais e gerenciamento de obras. Especialista em análise estrutural, dimensionamento de estruturas de concreto armado e aço.',
    
    // Dados Profissionais
    title: 'Engenheiro Civil Sênior',
    company: 'TechCorp Solutions',
    experience: '8',
    hourlyRate: '150',
    availability: 'available' as 'available' | 'busy' | 'unavailable',
    
    // Formação
    education: 'Engenharia Civil - USP',
    graduationYear: '2016',
    
    // Especialidades
    specialties: ['Estruturas de Concreto', 'Análise Estrutural', 'AutoCAD', 'Revit'],
    
    // Links
    website: 'https://joaosilva.eng.br',
    linkedin: 'https://linkedin.com/in/joaosilva'
  });

  const [newSpecialty, setNewSpecialty] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleSave = () => {
    // Aqui seria feita a chamada para API para salvar os dados
    console.log('Dados salvos:', formData);
    alert('✅ Perfil atualizado com sucesso!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push('/')}
                className="text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EngConnect</span>
              </div>
            </div>
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Título da Página */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Editar Meu Perfil
          </h1>
          <p className="text-gray-300 text-lg">
            Mantenha suas informações atualizadas para receber as melhores oportunidades
          </p>
        </div>

        {/* Preview do Perfil */}
        <Card className="bg-gray-900/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2 text-red-500" />
              Preview do Perfil
            </CardTitle>
            <CardDescription className="text-gray-400">
              Veja como seu perfil aparecerá para as empresas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-red-600 text-white text-xl">
                  {formData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{formData.name}</h3>
                <p className="text-gray-300 mb-2">{formData.title}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {formData.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {formData.experience} anos
                  </div>
                  <Badge 
                    variant={formData.availability === 'available' ? 'default' : 'secondary'}
                    className={formData.availability === 'available' ? 'bg-green-600' : 'bg-yellow-600'}
                  >
                    {formData.availability === 'available' ? 'Disponível' : 'Ocupado'}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm mb-3">{formData.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {formData.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="border-gray-600 text-gray-300">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Dados Pessoais */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="w-5 h-5 mr-2 text-red-500" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-gray-300">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-gray-300">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="location" className="text-gray-300">Localização</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Cidade, Estado"
                />
              </div>
              
              <div>
                <Label htmlFor="bio" className="text-gray-300">Sobre Você</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                  placeholder="Descreva sua experiência e especialidades..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Dados Profissionais */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-red-500" />
                Dados Profissionais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">Cargo/Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Ex: Engenheiro Civil Sênior"
                />
              </div>
              
              <div>
                <Label htmlFor="company" className="text-gray-300">Empresa Atual</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="experience" className="text-gray-300">Anos de Experiência</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="hourlyRate" className="text-gray-300">Valor por Hora (R$)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="availability" className="text-gray-300">Disponibilidade</Label>
                <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="busy">Ocupado</SelectItem>
                    <SelectItem value="unavailable">Indisponível</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Formação */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-red-500" />
                Formação Acadêmica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="education" className="text-gray-300">Curso e Instituição</Label>
                <Input
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Ex: Engenharia Civil - USP"
                />
              </div>
              
              <div>
                <Label htmlFor="graduationYear" className="text-gray-300">Ano de Formação</Label>
                <Input
                  id="graduationYear"
                  value={formData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Especialidades */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="w-5 h-5 mr-2 text-red-500" />
                Especialidades e Habilidades
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white flex-1"
                  placeholder="Adicionar especialidade..."
                  onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                />
                <Button 
                  onClick={addSpecialty}
                  size="sm"
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.specialties.map((specialty) => (
                  <Badge 
                    key={specialty} 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 pr-1"
                  >
                    {specialty}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeSpecialty(specialty)}
                      className="ml-1 h-auto p-0 text-gray-400 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Links e Redes Sociais */}
        <Card className="bg-gray-900/50 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="w-5 h-5 mr-2 text-red-500" />
              Links e Redes Sociais
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website" className="text-gray-300">Website/Portfólio</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="https://seusite.com"
              />
            </div>
            
            <div>
              <Label htmlFor="linkedin" className="text-gray-300">LinkedIn</Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="https://linkedin.com/in/seuperfil"
              />
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
}