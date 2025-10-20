import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'

export const metadata: Metadata = {
  title: 'EngConnect - Conecte-se com os Melhores Engenheiros',
  description: 'A plataforma que une empresas e profissionais de engenharia de forma simples e eficiente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="font-inter antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}