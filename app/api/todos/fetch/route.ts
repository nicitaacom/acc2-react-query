import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
export async function GET() {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    const { data } = await supabase.from("products").select().eq("id", "123")
    return NextResponse.json(data)
  } catch (error) {
    console.log(error)
  }
}
