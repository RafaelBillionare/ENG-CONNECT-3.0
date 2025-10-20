import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
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
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          profession?: string
          bio?: string
          location?: string
          phone?: string
          linkedin?: string
          github?: string
          portfolio?: string
          skills?: string[]
          experience_years?: number
          education?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          profession?: string
          bio?: string
          location?: string
          phone?: string
          linkedin?: string
          github?: string
          portfolio?: string
          skills?: string[]
          experience_years?: number
          education?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          budget_min: number
          budget_max: number
          deadline: string
          skills_required: string[]
          status: 'open' | 'in_progress' | 'completed' | 'cancelled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          budget_min: number
          budget_max: number
          deadline: string
          skills_required: string[]
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          budget_min?: number
          budget_max?: number
          deadline?: string
          skills_required?: string[]
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
          updated_at?: string
        }
      }
      proposals: {
        Row: {
          id: string
          project_id: string
          engineer_id: string
          message: string
          budget: number
          timeline: string
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          engineer_id: string
          message: string
          budget: number
          timeline: string
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          engineer_id?: string
          message?: string
          budget?: number
          timeline?: string
          status?: 'pending' | 'accepted' | 'rejected'
          updated_at?: string
        }
      }
      portfolios: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          technologies: string[]
          project_url: string
          github_url: string
          image_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          technologies: string[]
          project_url?: string
          github_url?: string
          image_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          technologies?: string[]
          project_url?: string
          github_url?: string
          image_url?: string
          updated_at?: string
        }
      }
      resumes: {
        Row: {
          id: string
          user_id: string
          file_url: string
          file_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_url: string
          file_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_url?: string
          file_name?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}