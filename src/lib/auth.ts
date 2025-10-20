import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface AuthUser extends User {
  profile?: {
    id: string
    name: string
    email: string
    profession: string
    bio: string
    location: string
    phone: string
    linkedin: string
    github: string
    portfolio: string
    skills: string[]
    experience_years: number
    education: string
  }
}

// Função para fazer login
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

// Função para fazer cadastro
export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })
  
  // Se o cadastro foi bem-sucedido, criar perfil
  if (data.user && !error) {
    await createProfile(data.user.id, name, email)
  }
  
  return { data, error }
}

// Função para fazer logout
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Função para obter usuário atual
export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null
  
  // Buscar perfil do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()
  
  return {
    ...user,
    profile: profile || undefined
  }
}

// Função para criar perfil
export async function createProfile(userId: string, name: string, email: string) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      user_id: userId,
      name,
      email,
    })
    .select()
    .single()
  
  return { data, error }
}

// Função para atualizar perfil
export async function updateProfile(userId: string, updates: Partial<{
  name: string
  profession: string
  bio: string
  location: string
  phone: string
  linkedin: string
  github: string
  portfolio: string
  skills: string[]
  experience_years: number
  education: string
}>) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single()
  
  return { data, error }
}

// Função para obter perfil por ID do usuário
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

// Função para criar projeto
export async function createProject(project: {
  user_id: string
  title: string
  description: string
  budget_min: number
  budget_max: number
  deadline: string
  skills_required: string[]
}) {
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single()
  
  return { data, error }
}

// Função para obter projetos
export async function getProjects(userId?: string) {
  let query = supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (userId) {
    query = query.eq('user_id', userId)
  }
  
  const { data, error } = await query
  return { data, error }
}

// Função para criar proposta
export async function createProposal(proposal: {
  project_id: string
  engineer_id: string
  message: string
  budget: number
  timeline: string
}) {
  const { data, error } = await supabase
    .from('proposals')
    .insert(proposal)
    .select()
    .single()
  
  return { data, error }
}

// Função para obter propostas
export async function getProposals(userId: string, type: 'sent' | 'received') {
  const column = type === 'sent' ? 'engineer_id' : 'project_id'
  
  let query = supabase
    .from('proposals')
    .select(`
      *,
      projects (
        title,
        description,
        user_id
      )
    `)
    .order('created_at', { ascending: false })
  
  if (type === 'sent') {
    query = query.eq('engineer_id', userId)
  } else {
    // Para propostas recebidas, buscar projetos do usuário
    const { data: userProjects } = await supabase
      .from('projects')
      .select('id')
      .eq('user_id', userId)
    
    if (userProjects && userProjects.length > 0) {
      const projectIds = userProjects.map(p => p.id)
      query = query.in('project_id', projectIds)
    } else {
      return { data: [], error: null }
    }
  }
  
  const { data, error } = await query
  return { data, error }
}

// Função para criar item do portfólio
export async function createPortfolioItem(item: {
  user_id: string
  title: string
  description: string
  technologies: string[]
  project_url?: string
  github_url?: string
  image_url?: string
}) {
  const { data, error } = await supabase
    .from('portfolios')
    .insert(item)
    .select()
    .single()
  
  return { data, error }
}

// Função para obter itens do portfólio
export async function getPortfolioItems(userId: string) {
  const { data, error } = await supabase
    .from('portfolios')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Função para fazer upload de currículo
export async function uploadResume(userId: string, file: File) {
  // Upload do arquivo
  const fileName = `${userId}/${Date.now()}-${file.name}`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('resumes')
    .upload(fileName, file)
  
  if (uploadError) return { data: null, error: uploadError }
  
  // Obter URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('resumes')
    .getPublicUrl(fileName)
  
  // Salvar referência no banco
  const { data, error } = await supabase
    .from('resumes')
    .insert({
      user_id: userId,
      file_url: publicUrl,
      file_name: file.name,
    })
    .select()
    .single()
  
  return { data, error }
}

// Função para obter currículos
export async function getResumes(userId: string) {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}