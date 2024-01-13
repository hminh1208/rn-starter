import { createClient } from "@supabase/supabase-js";
import Config from "react-native-config";
import 'react-native-url-polyfill/auto'

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(
    `https://exgwalctaytsqmmralrt.supabase.co`,
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Z3dhbGN0YXl0c3FtbXJhbHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyNzg5NTksImV4cCI6MTk5ODg1NDk1OX0.Rb5iISckOnV-00bqLJuzw8NTQeNdC2-TyTMT7C_BehQ`
);



export default supabaseClient;
