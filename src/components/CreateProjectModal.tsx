'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Upload, 
  X, 
  MapPin, 
  Calendar, 
  DollarSign,
  FileText,
  Building2,
  Clock
} from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: any) => void;
}

export function CreateProjectModal({ isOpen, onClose, onSubmit }: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'freelance' as 'freelance' | 'clt',
    location: '',
    remote: false,
    budgetMin: '',
    budgetMax: '',
    deadline: '',
    skills: [] as string[],
    images: [] as string[]
  });

  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      budgetMin: formData.budgetMin ? parseFloat(formData.budgetMin) : undefined,
      budgetMax: formData.budgetMax ? parseFloat(formData.budgetMax) : undefined,
      deadline: formData.deadline ? new Date(formData.deadline) : undefined,
    });
    onClose();
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Criar Novo Projeto</DialogTitle>
          <DialogDescription className="text-gray-400">
            Publique seu projeto e receba propostas de engenheiros qualificados
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Título do Projeto</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ex: Projeto estrutural para edifício comercial"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">Descrição Detalhada</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva detalhadamente o projeto, requisitos, entregáveis..."
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
              required
            />
          </div>

          {/* Tipo e Localização */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Tipo de Contratação</Label>
              <Select value={formData.type} onValueChange={(value: 'freelance' | 'clt') => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="freelance" className="text-white">Freelance/Projeto</SelectItem>
                  <SelectItem value="clt" className="text-white">CLT/Efetivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">Localização</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Ex: São Paulo, SP"
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Orçamento */}
          {formData.type === 'freelance' && (
            <div className="space-y-2">
              <Label className="text-white">Orçamento (R$)</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  value={formData.budgetMin}
                  onChange={(e) => setFormData(prev => ({ ...prev, budgetMin: e.target.value }))}
                  placeholder="Valor mínimo"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                <Input
                  type="number"
                  value={formData.budgetMax}
                  onChange={(e) => setFormData(prev => ({ ...prev, budgetMax: e.target.value }))}
                  placeholder="Valor máximo"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
          )}

          {/* Prazo */}
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-white">Prazo de Entrega</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          {/* Habilidades */}
          <div className="space-y-2">
            <Label className="text-white">Habilidades Necessárias</Label>
            <div className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Ex: AutoCAD, Estruturas..."
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill} className="bg-red-600 hover:bg-red-700">
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="border-gray-600 text-gray-300">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900">
              Publicar Projeto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}