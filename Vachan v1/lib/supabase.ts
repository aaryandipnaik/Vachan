import { createClient } from "@supabase/supabase-js"

// Create a standard client for client-side operations
export const supabase = createClient(
  "https://oxfdfpoghrxfmdhpkhwh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZmRmcG9naHJ4Zm1kaHBraHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTY0NjEsImV4cCI6MjA1NzAzMjQ2MX0.JPM0HL0-huYTiDLkljJhOMtjibWvNqjdBGNio62fSKw",
)

// Create a function to execute SQL directly
export async function executeSql(sql: string) {
  try {
    // Use the REST API to execute SQL
    const response = await fetch(`https://oxfdfpoghrxfmdhpkhwh.supabase.co/rest/v1/rpc/exec_sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZmRmcG9naHJ4Zm1kaHBraHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTY0NjEsImV4cCI6MjA1NzAzMjQ2MX0.JPM0HL0-huYTiDLkljJhOMtjibWvNqjdBGNio62fSKw",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94ZmRmcG9naHJ4Zm1kaHBraHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTY0NjEsImV4cCI6MjA1NzAzMjQ2MX0.JPM0HL0-huYTiDLkljJhOMtjibWvNqjdBGNio62fSKw`,
      },
      body: JSON.stringify({
        sql_query: sql,
      }),
    })

    return await response.json()
  } catch (error) {
    console.error("Error executing SQL:", error)
    throw error
  }
}

