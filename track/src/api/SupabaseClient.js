import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { AppState } from 'react-native'

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(
    'https://lbewfdxzjwveaofbnbiz.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiZXdmZHh6and2ZWFvZmJuYml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYyNTcyMTksImV4cCI6MjAyMTgzMzIxOX0.D6SqNcj5X4EG0EFpycpcPDbeuz2PWrUEiMnla0G6cPA',
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        }
    });

AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabaseClient.auth.startAutoRefresh()
    } else {
        supabaseClient.auth.stopAutoRefresh()
    }
});

export default supabaseClient;