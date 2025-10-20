'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Wrench, 
  MapPin, 
  Globe, 
  Users, 
  Briefcase,
  Plus,
  X,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface ProfileSetupProps {
  userData: {
    name: string;
    email: string;
    password: string;
  };
  onComplete: (profileData: any) => void;
}

export function ProfileSetup({ userData, onComplete }: ProfileSetupProps) {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'company' | 'engineer' | null>(null);
  const [profileData, setProfileData] = useState<any>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const handleUserTypeSelect = (type: 'company' | 'engineer') => {
    setUserType(type);
    setStep(2);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = () => {
    const completeProfile = {
      ...userData,
      type: userType,
      ...profileData,
      ...(userType === 'engineer' && { skills, specialties: skills.slice(0, 3) }),
      createdAt: new Date(),
      id: Date.now().toString()
    };
    
    onComplete(completeProfile);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Bem-vindo, {userData.name}!
            </h1>
            <p className="text-gray-400 text-lg">
              Para personalizar sua experiência, nos conte um pouco sobre você
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Opção Empresa */}
            <Card 
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 hover:border-red-500/50 transition-all duration-500 cursor-pointer group backdrop-blur-sm hover:shadow-2xl hover:shadow-red-500/10 transform hover:scale-[1.02]"
              onClick={() => handleUserTypeSelect('company')}
            >
              <CardHeader className="text-center pb-6 pt-8">
                <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-3 font-bold">
                  Represento uma Empresa
                </CardTitle>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  Preciso contratar engenheiros para projetos ou vagas CLT
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center px-6 pb-8">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-start space-x-3 text-left">
                    <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-200 text-sm">Publique projetos e vagas</span>
                  </div>
                  <div className="flex items-center justify-start space-x-3 text-left">
                    <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-200 text-sm">Receba propostas qualificadas</span>
                  </div>
                  <div className="flex items-center justify-start space-x-3 text-left">
                    <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-200 text-sm">Gerencie todo o processo</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold py-3 shadow-lg hover:shadow-red-500/25 transition-all group">
                  Continuar como Empresa
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Opção Engenheiro */}
            <Card 
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 hover:border-red-500/50 transition-all duration-500 cursor-pointer group backdrop-blur-sm hover:shadow-2xl hover:shadow-red-500/10 transform hover:scale-[1.02]"
              onClick={() => handleUserTypeSelect('engineer')}
            >
              <CardHeader className="text-center pb-6 pt-8">
                <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Wrench className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl text-white mb-3 font-bold">
                  Sou um Engenheiro
                </CardTitle>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  Quero encontrar oportunidades de trabalho e projetos
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center px-6 pb-8">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-start space-x-3 text-left">
                    <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-200 text-sm">Encontre projetos ideais</span>
                  </div>
                  <div className="flex items-center justify-start space-x-3 text-left">
                    <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-200 text-sm">Envie propostas personalizadas</span>
                  </div>
                  <div className="flex items-center justify-start space-x-3 text-left">
                    <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-200 text-sm">Construa sua reputação</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold py-3 shadow-lg hover:shadow-red-500/25 transition-all group">
                  Continuar como Engenheiro
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="bg-gray-900/80 border-gray-700/50 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {userType === 'company' ? (
                  <Building2 className="w-8 h-8 text-white" />
                ) : (
                  <Wrench className="w-8 h-8 text-white" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                {userType === 'company' ? 'Informações da Empresa' : 'Seu Perfil Profissional'}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {userType === 'company' 
                  ? 'Conte-nos sobre sua empresa para atrair os melhores profissionais'
                  : 'Destaque suas habilidades e experiência para encontrar os melhores projetos'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {userType === 'company' ? (
                <>
                  {/* Nome da Empresa */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Nome da Empresa</Label>
                    <Input
                      placeholder="Ex: TechCorp Solutions"
                      value={profileData.companyName || ''}
                      onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* CNPJ */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">CNPJ</Label>
                    <Input
                      placeholder="00.000.000/0000-00"
                      value={profileData.cnpj || ''}
                      onChange={(e) => setProfileData({...profileData, cnpj: e.target.value})}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Localização */}
                  <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Localização
                    </Label>
                    <Input
                      placeholder="Ex: São Paulo, SP"
                      value={profileData.location || ''}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Website (opcional)
                    </Label>
                    <Input
                      placeholder="https://suaempresa.com"
                      value={profileData.website || ''}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Tamanho da Empresa */}
                  <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Tamanho da Empresa
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'startup', label: 'Startup (1-10)' },
                        { value: 'small', label: 'Pequena (11-50)' },
                        { value: 'medium', label: 'Média (51-200)' },
                        { value: 'large', label: 'Grande (200+)' }
                      ].map((size) => (
                        <Button
                          key={size.value}
                          type="button"
                          variant={profileData.size === size.value ? 'default' : 'outline'}
                          className={`${
                            profileData.size === size.value 
                              ? 'bg-red-600 hover:bg-red-700' 
                              : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                          }`}
                          onClick={() => setProfileData({...profileData, size: size.value})}
                        >
                          {size.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Descrição da Empresa</Label>
                    <Textarea
                      placeholder="Conte sobre sua empresa, área de atuação, principais projetos..."
                      value={profileData.description || ''}
                      onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Título Profissional */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Título Profissional</Label>
                    <Input
                      placeholder="Ex: Engenheiro Civil Sênior"
                      value={profileData.title || ''}
                      onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Experiência */}
                  <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Anos de Experiência
                    </Label>
                    <Input
                      type="number"
                      placeholder="Ex: 5"
                      value={profileData.experience || ''}
                      onChange={(e) => setProfileData({...profileData, experience: parseInt(e.target.value) || 0})}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Localização */}
                  <div className="space-y-2">
                    <Label className="text-gray-300 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Localização
                    </Label>
                    <Input
                      placeholder="Ex: São Paulo, SP"
                      value={profileData.location || ''}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Valor por Hora */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Valor por Hora (opcional)</Label>
                    <Input
                      type="number"
                      placeholder="Ex: 120"
                      value={profileData.hourlyRate || ''}
                      onChange={(e) => setProfileData({...profileData, hourlyRate: parseInt(e.target.value) || 0})}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Habilidades */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Habilidades e Especialidades</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Ex: AutoCAD, Estruturas, SAP2000..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Button
                        type="button"
                        onClick={handleAddSkill}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="border-gray-600 text-gray-300 bg-gray-800/50"
                          >
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-2 text-gray-400 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Disponibilidade */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Disponibilidade</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'available', label: 'Disponível' },
                        { value: 'busy', label: 'Ocupado' },
                        { value: 'unavailable', label: 'Indisponível' }
                      ].map((status) => (
                        <Button
                          key={status.value}
                          type="button"
                          variant={profileData.availability === status.value ? 'default' : 'outline'}
                          className={`${
                            profileData.availability === status.value 
                              ? 'bg-red-600 hover:bg-red-700' 
                              : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                          }`}
                          onClick={() => setProfileData({...profileData, availability: status.value})}
                        >
                          {status.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Botão de Finalizar */}
              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold py-3 mt-8 shadow-lg hover:shadow-red-500/25 transition-all"
              >
                Finalizar Cadastro
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}