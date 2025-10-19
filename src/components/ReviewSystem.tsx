'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Star, 
  MessageSquare,
  ThumbsUp,
  Award,
  Calendar
} from 'lucide-react';
import { Review } from '@/lib/types';
import { formatDate } from '@/lib/data';

interface ReviewSystemProps {
  reviews: Review[];
  onSubmitReview: (review: any) => void;
  canReview?: boolean;
  targetId: string;
  targetName: string;
}

export function ReviewSystem({ reviews, onSubmitReview, canReview = false, targetId, targetName }: ReviewSystemProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = () => {
    if (rating > 0 && comment.trim()) {
      onSubmitReview({
        rating,
        comment: comment.trim(),
        reviewedId: targetId,
      });
      setRating(0);
      setComment('');
      setShowReviewModal(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="w-5 h-5 mr-2 text-red-500" />
            Avaliações de {targetName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= averageRating ? 'text-yellow-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                ))}
              </div>
              <div className="text-gray-400 text-sm">
                Baseado em {reviews.length} avaliações
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ stars, count, percentage }) => (
                <div key={stars} className="flex items-center space-x-2">
                  <span className="text-white text-sm w-8">{stars}★</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-sm w-8">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {canReview && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <Button 
                onClick={() => setShowReviewModal(true)}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
              >
                <Star className="w-4 h-4 mr-2" />
                Avaliar Profissional
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-gray-800/50 border-gray-600">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-red-600 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {review.type === 'company_to_engineer' ? 'Empresa' : 'Engenheiro'}
                      </Badge>
                    </div>
                    <div className="text-gray-400 text-sm flex items-center mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{review.comment}</p>
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && (
          <Card className="bg-gray-800/50 border-gray-600">
            <CardContent className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-medium mb-2">Nenhuma avaliação ainda</h3>
              <p className="text-gray-400">
                As avaliações aparecerão aqui após a conclusão dos projetos.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-md bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Avaliar {targetName}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Compartilhe sua experiência trabalhando com este profissional
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Rating Stars */}
            <div className="space-y-2">
              <Label className="text-white">Avaliação</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-400 hover:text-yellow-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <Label className="text-white">Comentário</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Descreva sua experiência, qualidade do trabalho, comunicação..."
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setShowReviewModal(false)}
                className="border-gray-600 text-gray-300"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSubmitReview}
                disabled={rating === 0 || !comment.trim()}
                className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 disabled:opacity-50"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Enviar Avaliação
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}