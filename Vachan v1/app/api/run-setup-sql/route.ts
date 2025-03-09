import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    // SQL to create the profiles table
    const sql = `
    -- Create profiles table if it doesn't exist
    CREATE TABLE IF NOT EXISTS public.profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      display_name TEXT,
      phone_number TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Set up RLS for profiles
    ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

    -- Create policies for profiles if they don't exist
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile'
      ) THEN
        CREATE POLICY "Users can view their own profile"
        ON public.profiles
        FOR SELECT
        USING (auth.uid() = id);
      END IF;
      
      IF NOT EXISTS (
        SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile'
      ) THEN
        CREATE POLICY "Users can update their own profile"
        ON public.profiles
        FOR UPDATE
        USING (auth.uid() = id);
      END IF;
      
      IF NOT EXISTS (
        SELECT FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile'
      ) THEN
        CREATE POLICY "Users can insert their own profile"
        ON public.profiles
        FOR INSERT
        WITH CHECK (auth.uid() = id);
      END IF;
    END
    $$;
    `

    // Execute the SQL using the Supabase function
    const { error } = await supabase.rpc("exec_sql", { sql_query: sql })

    if (error) {
      console.error("Error executing SQL:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Database setup completed successfully" })
  } catch (error: any) {
    console.error("Error in run-setup-sql:", error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

