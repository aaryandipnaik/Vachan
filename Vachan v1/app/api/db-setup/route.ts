import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: false,
    message:
      "Database tables need to be created manually. Please run the SQL in supabase/setup.sql in the Supabase dashboard SQL Editor.",
    instructions: `
    1. Go to your Supabase dashboard
    2. Navigate to the SQL Editor
    3. Copy and paste the contents of supabase/setup.sql
    4. Run the SQL commands
    5. Refresh the application
    `,
  })
}

