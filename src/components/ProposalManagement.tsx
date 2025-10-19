'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Clock, 
  DollarSign,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star
} from 'lucide-react';
import { Proposal, ProposalStatus } from '@/lib/types';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '@/lib/data';

interface ProposalManagementProps {
  proposals: Proposal[];
  onUpdateStatus: (proposalId: string, status: ProposalStatus, feedback?: string) => void;
}

export function ProposalManagement({ proposals, onUpdateStatus }: ProposalManagementProps) {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [newStatus, setNewStatus] = useState<ProposalStatus>('sent');

  const handleStatusUpdate = (proposalId: string) => {
    onUpdateStatus(proposalId, newStatus, feedback);
    setSelectedProposal(null);
    setFeedback('');
  };

  const getStatusIcon = (status: ProposalStatus) => {
    switch (status) {
      case 'sent':
        return <Clock className="w-4 h-4" />;
      case 'analyzing':
        return <AlertCircle className="w-4 h-4" />;
      case 'revision':
        return <MessageSquare className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Gerenciar Propostas</h2>
        <Badge variant="outline" className="border-gray-600 text-gray-300">
          {proposals.length} propostas recebidas
        </Badge>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className="bg-gray-800/50 border-gray-600">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-red-600 text-white">
                      {proposal.engineer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-white text-lg">{proposal.engineer.name}</CardTitle>
                    <CardDescription className="text-gray-400">{proposal.engineer.title}</CardDescription>
                    <div className="flex items-center space-x-3 text-sm text-gray-400 mt-1">
                      <span className="flex items-center">
                        <Star className="w-3 h-3 mr-1 text-yellow-500" />
                        {proposal.engineer.rating}
                      </span>
                      <span>{proposal.engineer.experience} anos</span>
                      <span>{proposal.engineer.completedProjects} projetos</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(proposal.status)} mb-2`}
                  >
                    {getStatusIcon(proposal.status)}
                    <span className="ml-1">{getStatusLabel(proposal.status)}</span>
                  </Badge>
                  <div className="text-sm text-gray-400">
                    {formatDate(proposal.createdAt)}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Detalhes da Proposta */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Valor:</span>
                  <span className="text-white font-semibold">{formatCurrency(proposal.price)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Prazo:</span>
                  <span className="text-white">{proposal.timeline}</span>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <Label className="text-gray-400 text-sm">Descrição da Proposta:</Label>
                <p className="text-gray-300 text-sm mt-1 bg-gray-900/50 p-3 rounded-lg">
                  {proposal.description}
                </p>
              </div>

              {/* Feedback anterior */}
              {proposal.feedback && (
                <div>
                  <Label className="text-gray-400 text-sm">Feedback Anterior:</Label>
                  <p className="text-gray-300 text-sm mt-1 bg-yellow-900/20 p-3 rounded-lg border border-yellow-600/30">
                    {proposal.feedback}
                  </p>
                </div>
              )}

              {/* Ações */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => setSelectedProposal(selectedProposal === proposal.id ? null : proposal.id)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {selectedProposal === proposal.id ? 'Cancelar' : 'Gerenciar'}
                  </Button>
                </div>

                <div className="flex space-x-2">
                  {proposal.status === 'sent' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/20"
                        onClick={() => {
                          setNewStatus('analyzing');
                          handleStatusUpdate(proposal.id);
                        }}
                      >
                        Analisar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => {
                          setNewStatus('rejected');
                          handleStatusUpdate(proposal.id);
                        }}
                      >
                        Rejeitar
                      </Button>
                    </>
                  )}
                  
                  {proposal.status === 'analyzing' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-orange-600 text-orange-400 hover:bg-orange-900/20"
                        onClick={() => {
                          setNewStatus('revision');
                          setSelectedProposal(proposal.id);
                        }}
                      >
                        Solicitar Revisão
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          setNewStatus('approved');
                          handleStatusUpdate(proposal.id);
                        }}
                      >
                        Aprovar
                      </Button>
                    </>
                  )}

                  {proposal.status === 'revision' && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        setNewStatus('approved');
                        handleStatusUpdate(proposal.id);
                      }}
                    >
                      Aprovar
                    </Button>
                  )}
                </div>
              </div>

              {/* Painel de Gerenciamento */}
              {selectedProposal === proposal.id && (
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Alterar Status</Label>
                    <Select value={newStatus} onValueChange={(value: ProposalStatus) => setNewStatus(value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="analyzing" className="text-white">Em Análise</SelectItem>
                        <SelectItem value="revision" className="text-white">Solicitar Revisão</SelectItem>
                        <SelectItem value="approved" className="text-white">Aprovar</SelectItem>
                        <SelectItem value="rejected" className="text-white">Rejeitar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Feedback/Comentários</Label>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Adicione comentários, sugestões ou pontos que precisam ser revisados..."
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProposal(null)}
                      className="border-gray-600 text-gray-300"
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(proposal.id)}
                      className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                    >
                      Atualizar Status
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {proposals.length === 0 && (
          <Card className="bg-gray-800/50 border-gray-600">
            <CardContent className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">Nenhuma proposta recebida</h3>
              <p className="text-gray-400">
                Quando engenheiros enviarem propostas para seus projetos, elas aparecerão aqui.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}