import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import type { Database } from "@/interfaces/types_db"

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const { id } = await request.json()
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  })

  const { data, error } = await supabase
    .from("products")
    .update({
      title: crypto.randomUUID(),
    })
    .eq("id", id)

  return NextResponse.json(data)
}
