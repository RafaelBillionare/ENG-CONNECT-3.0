'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void;
  onSignup: () => void;
}

export function LoginForm({ onLogin, onSignup }: LoginFormProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
      } else {
        onLogin({ email, password });
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900/50 border-gray-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Entrar na sua conta</CardTitle>
          <CardDescription className="text-gray-400">
            Acesse sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Não tem uma conta?{' '}
              <button
                onClick={onSignup}
                className="text-red-400 hover:text-red-300 font-medium"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}