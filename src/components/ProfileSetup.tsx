'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { updateProfile } from '@/lib/auth'
import { useAuth } from '@/components/AuthProvider'
import { User, Briefcase, MapPin, Phone, Linkedin, Github, Globe, GraduationCap } from 'lucide-react'

interface ProfileSetupProps {
  onComplete: () => void
}

export function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const { user, refreshUser } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.profile?.name || user?.user_metadata?.name || '',
    profession: user?.profile?.profession || '',
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
    phone: user?.profile?.phone || '',
    linkedin: user?.profile?.linkedin || '',
    github: user?.profile?.github || '',
    portfolio: user?.profile?.portfolio || '',
    education: user?.profile?.education || '',
    experience_years: user?.profile?.experience_years || 0,
    skills: user?.profile?.skills?.join(', ') || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError('')

    try {
      const skillsArray = formData.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0)

      const { error } = await updateProfile(user.id, {
        name: formData.name,
        profession: formData.profession,
        bio: formData.bio,
        location: formData.location,
        phone: formData.phone,
        linkedin: formData.linkedin,
        github: formData.github,
        portfolio: formData.portfolio,
        education: formData.education,
        experience_years: formData.experience_years,
        skills: skillsArray
      })

      if (error) {
        setError(error.message)
      } else {
        await refreshUser()
        onComplete()
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Complete seu Perfil</CardTitle>
        <CardDescription className="text-center">
          Adicione suas informações para criar um perfil completo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profession">Profissão</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="profession"
                  placeholder="Ex: Desenvolvedor Full Stack"
                  value={formData.profession}
                  onChange={(e) => handleChange('profession', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              placeholder="Conte um pouco sobre você e sua experiência..."
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="Ex: São Paulo, SP"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience_years">Anos de Experiência</Label>
              <Input
                id="experience_years"
                type="number"
                min="0"
                value={formData.experience_years}
                onChange={(e) => handleChange('experience_years', parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Formação</Label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="education"
                  placeholder="Ex: Ciência da Computação - USP"
                  value={formData.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Habilidades</Label>
            <Input
              id="skills"
              placeholder="Ex: React, Node.js, Python, AWS (separadas por vírgula)"
              value={formData.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="linkedin"
                  placeholder="linkedin.com/in/seuperfil"
                  value={formData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <div className="relative">
                <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="github"
                  placeholder="github.com/seuusuario"
                  value={formData.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfólio</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="portfolio"
                  placeholder="seusite.com"
                  value={formData.portfolio}
                  onChange={(e) => handleChange('portfolio', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onComplete}
              className="flex-1"
            >
              Pular por Agora
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Salvando...' : 'Salvar Perfil'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}