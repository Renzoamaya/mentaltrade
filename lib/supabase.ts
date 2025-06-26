import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cliente para el lado del cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          trading_experience: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          trading_experience?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          trading_experience?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          date: string
          trades: any
          emotions: any
          goals: string[]
          learnings: string
          improvements: string
          gratitude: string
          tomorrow_plan: string
          market_conditions: string
          session_rating: number
          total_pnl: number
          trades_count: number
          win_rate: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          trades?: any
          emotions?: any
          goals?: string[]
          learnings?: string
          improvements?: string
          gratitude?: string
          tomorrow_plan?: string
          market_conditions?: string
          session_rating?: number
          total_pnl?: number
          trades_count?: number
          win_rate?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          trades?: any
          emotions?: any
          goals?: string[]
          learnings?: string
          improvements?: string
          gratitude?: string
          tomorrow_plan?: string
          market_conditions?: string
          session_rating?: number
          total_pnl?: number
          trades_count?: number
          win_rate?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
