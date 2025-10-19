'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Upload, 
  DollarSign,
  Clock,
  FileText,
  User
} from 'lucide-react';
import { Project, Engineer } from '@/lib/types';
import { formatCurrency } from '@/lib/data';

interface SendProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  engineer: Engineer;
  onSubmit: (proposal: any) => void;
}

export function SendProposalModal({ isOpen, onClose, project, engineer, onSubmit }: SendProposalModalProps) {
  const [formData, setFormData] = useState({
    price: '',
    timeline: '',
    description: '',
    attachments: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      projectId: project.id,
      engineerId: engineer.id,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Enviar Proposta</DialogTitle>
          <DialogDescription className="text-gray-400">
            Envie sua proposta para: {project.title}
          </DialogDescription>
        </DialogHeader>

        {/* Project Info */}
        <Card className="bg-gray-800/50 border-gray-600">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white text-lg">{project.title}</CardTitle>
                <CardDescription className="text-gray-400">{project.company.companyName}</CardDescription>
              </div>
              <Badge 
                variant={project.type === 'freelance' ? 'default' : 'secondary'}
                className={project.type === 'freelance' ? 'bg-blue-600' : 'bg-green-600'}
              >
                {project.type === 'freelance' ? 'Freelance' : 'CLT'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm mb-3">{project.description}</p>
            {project.budget && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Orçamento:</span>
                <span className="text-white">
                  {formatCurrency(project.budget.min)} - {formatCurrency(project.budget.max)}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Preço */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-white flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Valor da Proposta (R$)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="Ex: 25000.00"
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Prazo */}
          <div className="space-y-2">
            <Label htmlFor="timeline" className="text-white flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Prazo de Entrega
            </Label>
            <Input
              id="timeline"
              value={formData.timeline}
              onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
              placeholder="Ex: 3 meses, 45 dias úteis..."
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Descrição da Proposta */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Descrição da Proposta
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva sua abordagem, metodologia, etapas de entrega, diferenciais..."
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
              required
            />
          </div>

          {/* Anexos */}
          <div className="space-y-2">
            <Label className="text-white flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Anexos (Portfólio, Certificados)
            </Label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Clique para fazer upload ou arraste arquivos aqui</p>
              <p className="text-gray-500 text-xs mt-1">PDF, DOC, JPG até 10MB</p>
            </div>
          </div>

          {/* Seu Perfil */}
          <Card className="bg-gray-800/30 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <User className="w-5 h-5 mr-2" />
                Seu Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-red-600 text-white">
                    {engineer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{engineer.name}</h4>
                  <p className="text-gray-400 text-sm">{engineer.title}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                    <span>{engineer.experience} anos de experiência</span>
                    <span>★ {engineer.rating}</span>
                    <span>{engineer.completedProjects} projetos</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900">
              <Send className="w-4 h-4 mr-2" />
              Enviar Proposta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}