import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient"

export interface User {
    email: string
    created_at?: string
    userId: string
    Name: string
}

export type SupabaseUser = SupabaseAuthClient