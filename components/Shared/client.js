import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://qzzsrcmwxckkimnkncys.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6enNyY213eGNra2ltbmtuY3lzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTQ1NTk5MSwiZXhwIjoyMDExMDMxOTkxfQ.lAgUinY2WVKaNZT5dBGuFkyG-qtBjaQ_BTHeKSycJ-U'
)

