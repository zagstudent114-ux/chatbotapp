export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      athletes: {
        Row: {
          id: string
          email: string
          name: string
          age: number | null
          sport_type: string | null
          fitness_goal: string | null
          dietary_restrictions: string | null
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          age?: number | null
          sport_type?: string | null
          fitness_goal?: string | null
          dietary_restrictions?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          age?: number | null
          sport_type?: string | null
          fitness_goal?: string | null
          dietary_restrictions?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      fitness_metrics: {
        Row: {
          id: string
          athlete_id: string
          date: string
          weight: number | null
          body_fat_percentage: number | null
          muscle_mass: number | null
          workout_performance_score: number | null
          recovery_score: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          athlete_id: string
          date?: string
          weight?: number | null
          body_fat_percentage?: number | null
          muscle_mass?: number | null
          workout_performance_score?: number | null
          recovery_score?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          athlete_id?: string
          date?: string
          weight?: number | null
          body_fat_percentage?: number | null
          muscle_mass?: number | null
          workout_performance_score?: number | null
          recovery_score?: number | null
          notes?: string | null
          created_at?: string
        }
      }
      nutrition_logs: {
        Row: {
          id: string
          athlete_id: string
          date: string
          meal_type: string
          calories: number | null
          protein_grams: number | null
          carbs_grams: number | null
          fats_grams: number | null
          meal_description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          athlete_id: string
          date?: string
          meal_type?: string
          calories?: number | null
          protein_grams?: number | null
          carbs_grams?: number | null
          fats_grams?: number | null
          meal_description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          athlete_id?: string
          date?: string
          meal_type?: string
          calories?: number | null
          protein_grams?: number | null
          carbs_grams?: number | null
          fats_grams?: number | null
          meal_description?: string | null
          created_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          athlete_id: string
          session_id: string
          role: 'user' | 'assistant'
          content: string
          timestamp: string
        }
        Insert: {
          id?: string
          athlete_id: string
          session_id: string
          role: 'user' | 'assistant'
          content: string
          timestamp?: string
        }
        Update: {
          id?: string
          athlete_id?: string
          session_id?: string
          role?: 'user' | 'assistant'
          content?: string
          timestamp?: string
        }
      }
      knowledge_base: {
        Row: {
          id: string
          title: string
          content: string
          document_type: 'nutrition_guideline' | 'meal_plan' | 'fitness_protocol'
          embedding: number[] | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          document_type: 'nutrition_guideline' | 'meal_plan' | 'fitness_protocol'
          embedding?: number[] | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          document_type?: 'nutrition_guideline' | 'meal_plan' | 'fitness_protocol'
          embedding?: number[] | null
          metadata?: Json
          created_at?: string
        }
      }
    }
    Functions: {
      match_documents: {
        Args: {
          query_embedding: number[]
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          title: string
          content: string
          document_type: string
          similarity: number
        }[]
      }
    }
  }
}
