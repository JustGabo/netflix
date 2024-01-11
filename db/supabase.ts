import {createClient} from '@supabase/supabase-js'

const supabaseUrl =     process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PULIC_SUPABASE_KEY

export const supabase = createClient(supabaseUrl!, supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsenlsY25iYW9tdW1panhza3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3NzQ0MjgsImV4cCI6MjAyMDM1MDQyOH0.aA4gxsyLlkmbbdxlycSNSoSmjcJKNtubXGeDJJusuoc')