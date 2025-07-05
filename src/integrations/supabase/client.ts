
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://zknmzaowomihtrtqleon.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprbm16YW93b21paHRydHFsZW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MTA2MTgsImV4cCI6MjA2NzI4NjYxOH0.CyAQrLWbXQDoRgBAxk6jgpFXYANUSm1UqwkB8Stz7DU'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
