"use client"

import { useQuery } from "@tanstack/react-query"
import { ToDoCard } from "./ToDoCard"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export interface IProduct {
  id: string
  title: string
  sub_title: string
  price: number
  img_url: string[]
  on_stock: number
  owner_username: string
}

export default function Todos() {
  const supabase = createClientComponentClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userToDos"],
    queryFn: async () => {
      const { data } = await supabase.from("products").select().eq("id", "123")
      return data as IProduct[]
    },
  })

  if (isLoading) return <div className="fixed inset-0 bg-black text-white">Loading tasks...</div>
  if (isError) return <div>There was an error, try again</div>
  return (
    <div className="flex flex-col gap-2 text-sm font-light">
      {(data ?? []).map(todo => (
        <ToDoCard {...todo} key={crypto.randomUUID()} />
      ))}
    </div>
  )
}
