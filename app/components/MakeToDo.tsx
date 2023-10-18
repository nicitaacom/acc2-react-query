"use client"

import { useState } from "react"

import { Input } from "./ui/Input"
import { Button } from "./ui/Button"
import { useToast } from "@/hooks/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export default function MakeToDo() {
  const [input, setInput] = useState("")
  const queryClient = useQueryClient()

  const { toast } = useToast()
  const { mutate: submitToDo, isPending } = useMutation({
    mutationFn: async () => await axios.post("api/todos/create", { toDo: input }),
    onSuccess: () => {
      toast({ description: "ToDo added successfully" })
      setInput("")
      queryClient.invalidateQueries({ queryKey: ["userToDos"] })
    },
    onError: () => {
      toast({ description: "Something went wrong, please try again", variant: "destructive" })
    },
  })
  return (
    <div className="flex gap-2 min-w-full">
      <Input value={input} onChange={e => setInput(e.target.value)} disabled={isPending} placeholder="to do..." />
      <Button onClick={() => submitToDo()} disabled={isPending}>
        Submit
      </Button>
      <p>{isPending && "pending"}</p>
    </div>
  )
}
