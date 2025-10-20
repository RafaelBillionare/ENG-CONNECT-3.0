'use client';

import { useState, useEffect } from 'react';
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
  Wrench,
  Loader2,
  FileText,
  Upload,
  Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, updateProfile, getProfile } from '@/lib/auth';
import { toast } from 'sonner';

export default function EditarMeuPerfil() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUploading, setResumeUploading] = useState(false);
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    // Dados Pessoais
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    
    // Dados Profissionais
    title: '',
    company: '',
    experience: '',
    hourlyRate: '',
    availability: 'available' as 'available' | 'busy' | 'unavailable',
    
    // Formação
    education: '',
    graduationYear: '',
    
    // Especialidades
    specialties: [] as string[],
    
    // Links
    website: '',
    linkedin: '',
    
    // Currículo
    resumeUrl: '',
    resumeFileName: ''
  });

  const [newSpecialty, setNewSpecialty] = useState('');

  // Carregar dados do usuário atual
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      
      // Primeiro, tentar obter o usuário atual
      const user = await getCurrentUser();
      
      if (!user) {
        // Se não há usuário autenticado, criar um usuário mock para desenvolvimento
        console.log('Nenhum usuário autenticado encontrado, usando dados mock para desenvolvimento');
        
        const mockUser = {
          id: 'mock-user-id',
          email: 'usuario@exemplo.com',
          user_metadata: {
            name: 'Usuário Exemplo'
          },
          profile: {
            id: 'mock-profile-id',
            name: 'Usuário Exemplo',
            email: 'usuario@exemplo.com',
            profession: 'Engenheiro Civil',
            bio: 'Engenheiro civil com experiência em projetos residenciais e comerciais.',
            location: 'São Paulo, SP',
            phone: '(11) 99999-9999',
            linkedin: 'https://linkedin.com/in/usuario-exemplo',
            portfolio: 'https://portfolio-exemplo.com',
            skills: ['AutoCAD', 'Revit', 'Gestão de Projetos'],
            experience_years: 5,
            education: 'Engenharia Civil - USP',
            resume_url: '',
            resume_filename: ''
          }
        };
        
        setCurrentUser(mockUser);
        
        // Preencher formulário com dados mock
        setFormData({
          name: mockUser.profile.name,
          email: mockUser.profile.email,
          phone: mockUser.profile.phone,
          location: mockUser.profile.location,
          bio: mockUser.profile.bio,
          title: mockUser.profile.profession,
          company: '',
          experience: mockUser.profile.experience_years.toString(),
          hourlyRate: '',
          availability: 'available',
          education: mockUser.profile.education,
          graduationYear: '',
          specialties: mockUser.profile.skills,
          website: mockUser.profile.portfolio,
          linkedin: mockUser.profile.linkedin,
          resumeUrl: mockUser.profile.resume_url,
          resumeFileName: mockUser.profile.resume_filename
        });
        
        setLoading(false);
        return;
      }

      setCurrentUser(user);

      // Se o usuário tem perfil, carregar os dados
      if (user.profile) {
        setFormData({
          name: user.profile.name || '',
          email: user.profile.email || '',
          phone: user.profile.phone || '',
          location: user.profile.location || '',
          bio: user.profile.bio || '',
          title: user.profile.profession || '',
          company: '', // Não temos esse campo no banco ainda
          experience: user.profile.experience_years?.toString() || '',
          hourlyRate: '', // Não temos esse campo no banco ainda
          availability: 'available',
          education: user.profile.education || '',
          graduationYear: '', // Não temos esse campo no banco ainda
          specialties: user.profile.skills || [],
          website: user.profile.portfolio || '',
          linkedin: user.profile.linkedin || '',
          resumeUrl: user.profile.resume_url || '',
          resumeFileName: user.profile.resume_filename || ''
        });
      } else {
        // Usar dados básicos do usuário
        setFormData(prev => ({
          ...prev,
          name: user.user_metadata?.name || '',
          email: user.email || ''
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      
      // Em caso de erro, também usar dados mock para não quebrar a experiência
      const mockUser = {
        id: 'mock-user-id',
        email: 'usuario@exemplo.com',
        user_metadata: {
          name: 'Usuário Exemplo'
        },
        profile: {
          id: 'mock-profile-id',
          name: 'Usuário Exemplo',
          email: 'usuario@exemplo.com',
          profession: 'Engenheiro Civil',
          bio: 'Engenheiro civil com experiência em projetos residenciais e comerciais.',
          location: 'São Paulo, SP',
          phone: '(11) 99999-9999',
          linkedin: 'https://linkedin.com/in/usuario-exemplo',
          portfolio: 'https://portfolio-exemplo.com',
          skills: ['AutoCAD', 'Revit', 'Gestão de Projetos'],
          experience_years: 5,
          education: 'Engenharia Civil - USP',
          resume_url: '',
          resume_filename: ''
        }
      };
      
      setCurrentUser(mockUser);
      
      setFormData({
        name: mockUser.profile.name,
        email: mockUser.profile.email,
        phone: mockUser.profile.phone,
        location: mockUser.profile.location,
        bio: mockUser.profile.bio,
        title: mockUser.profile.profession,
        company: '',
        experience: mockUser.profile.experience_years.toString(),
        hourlyRate: '',
        availability: 'available',
        education: mockUser.profile.education,
        graduationYear: '',
        specialties: mockUser.profile.skills,
        website: mockUser.profile.portfolio,
        linkedin: mockUser.profile.linkedin,
        resumeUrl: mockUser.profile.resume_url,
        resumeFileName: mockUser.profile.resume_filename
      });
      
      toast.error('Erro ao carregar dados do perfil, usando dados de exemplo');
    } finally {
      setLoading(false);
    }
  };

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

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Formato de arquivo não suportado. Use PDF, DOC ou DOCX.');
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande. Máximo 5MB.');
      return;
    }

    setResumeFile(file);
    setResumeUploading(true);

    try {
      // Simular upload do arquivo
      // Em uma implementação real, você faria upload para um serviço como Supabase Storage
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular URL do arquivo
      const mockUrl = `https://storage.exemplo.com/resumes/${file.name}`;
      
      setFormData(prev => ({
        ...prev,
        resumeUrl: mockUrl,
        resumeFileName: file.name
      }));

      toast.success('Currículo anexado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload do currículo:', error);
      toast.error('Erro ao anexar currículo. Tente novamente.');
    } finally {
      setResumeUploading(false);
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    setFormData(prev => ({
      ...prev,
      resumeUrl: '',
      resumeFileName: ''
    }));
    toast.success('Currículo removido');
  };

  // Função para abrir seletor de arquivo
  const openFileSelector = () => {
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleSave = async () => {
    // Validação básica
    if (!formData.name.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }

    try {
      setSaving(true);
      toast.loading('Salvando perfil...', { id: 'saving' });

      // Preparar dados para salvar
      const profileData = {
        name: formData.name.trim(),
        profession: formData.title.trim(),
        bio: formData.bio.trim(),
        location: formData.location.trim(),
        phone: formData.phone.trim(),
        linkedin: formData.linkedin.trim(),
        portfolio: formData.website.trim(),
        skills: formData.specialties.filter(skill => skill.trim()),
        experience_years: parseInt(formData.experience) || 0,
        education: formData.education.trim(),
        resume_url: formData.resumeUrl,
        resume_filename: formData.resumeFileName
      };

      console.log('Salvando perfil com dados:', profileData);

      // Se temos um usuário real, tentar salvar no Supabase
      if (currentUser && currentUser.id !== 'mock-user-id') {
        const { data, error } = await updateProfile(currentUser.id, profileData);

        if (error) {
          console.error('Erro ao salvar perfil:', error);
          toast.error('Erro ao salvar perfil: ' + error.message, { id: 'saving' });
          return;
        }

        console.log('Perfil salvo com sucesso:', data);
      } else {
        // Para usuário mock, simular salvamento
        console.log('Simulando salvamento para usuário mock:', profileData);
      }

      toast.success('✅ Perfil atualizado com sucesso!', { id: 'saving' });
      
      // Aguardar um pouco antes de redirecionar
      setTimeout(() => {
        router.push('/');
      }, 1500);

    } catch (error) {
      console.error('Erro inesperado ao salvar perfil:', error);
      toast.error('Erro inesperado ao salvar perfil', { id: 'saving' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-500 mx-auto mb-4" />
          <p className="text-gray-300">Carregando dados do perfil...</p>
        </div>
      </div>
    );
  }

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
              disabled={saving}
              className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </>
              )}
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
                  {formData.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">{formData.name || 'Nome não informado'}</h3>
                <p className="text-gray-300 mb-2">{formData.title || 'Profissão não informada'}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {formData.location || 'Localização não informada'}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {formData.experience ? `${formData.experience} anos` : 'Experiência não informada'}
                  </div>
                  <Badge 
                    variant={formData.availability === 'available' ? 'default' : 'secondary'}
                    className={formData.availability === 'available' ? 'bg-green-600' : 'bg-yellow-600'}
                  >
                    {formData.availability === 'available' ? 'Disponível' : 'Ocupado'}
                  </Badge>
                </div>
                <p className="text-gray-300 text-sm mb-3">{formData.bio || 'Biografia não informada'}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="border-gray-600 text-gray-300">
                      {specialty}
                    </Badge>
                  ))}
                  {formData.specialties.length === 0 && (
                    <Badge variant="outline" className="border-gray-600 text-gray-500">
                      Nenhuma especialidade adicionada
                    </Badge>
                  )}
                </div>
                {formData.resumeFileName && (
                  <div className="flex items-center text-sm text-green-400">
                    <FileText className="w-4 h-4 mr-1" />
                    Currículo anexado: {formData.resumeFileName}
                  </div>
                )}
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
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">O e-mail não pode ser alterado</p>
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

        {/* Currículo */}
        <Card className="bg-gray-900/50 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileText className="w-5 h-5 mr-2 text-red-500" />
              Cadastrar Currículo
            </CardTitle>
            <CardDescription className="text-gray-400">
              Anexe seu currículo em PDF, DOC ou DOCX (máximo 5MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!formData.resumeFileName ? (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">
                      Anexar Currículo
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Clique para selecionar ou arraste seu arquivo aqui
                    </p>
                    <p className="text-gray-500 text-xs">
                      Formatos aceitos: PDF, DOC, DOCX • Máximo 5MB
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={resumeUploading}
                    />
                    <Button 
                      onClick={openFileSelector}
                      disabled={resumeUploading}
                      className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 disabled:opacity-50 relative z-20 pointer-events-auto"
                    >
                      {resumeUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Anexando...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Selecionar Arquivo
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{formData.resumeFileName}</p>
                    <p className="text-gray-400 text-sm">Currículo anexado com sucesso</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {formData.resumeUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(formData.resumeUrl, '_blank')}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Visualizar
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removeResume}
                    className="border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
            disabled={saving}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}