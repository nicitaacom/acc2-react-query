import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

import type { Database } from "@/interfaces/types_db"

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const { title } = await request.json()
  const cookieStore = cookies()

  const supabase = createRouteHandlerClient<Database>({
    cookies: () => cookieStore,
  })

  const { data, error } = await supabase.from("products").insert({
    id: crypto.randomUUID(),
    img_url: [
      "https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
    ],
    on_stock: 3,
    owner_username: "Nikita",
    price: 123,
    sub_title: "skadnsa",
    title: "something",
  })

  console.log(32, "error - ", error)
  console.log(32, "crypto.randomUUID()- ", crypto.randomUUID())
  return NextResponse.json(data)
}
