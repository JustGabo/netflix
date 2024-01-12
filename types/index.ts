import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient"

export interface Account {
    id: number
    email: string
    created_at?: string
    name: string
}

export interface Profile {
    id: number
    profileName: string
    profileImg: string
    ownerEmail: string
}

export type SupabaseUser = SupabaseAuthClient

export interface Movie {
    id:number
    created_at: string
    url: string
    name: string
    description: string
    duration: string
    posterUrl: string
    genre: string
}