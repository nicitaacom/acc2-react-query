"use client"

import { Button } from "./ui/Button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from "./ui/Card"
import type { IProduct } from "./Todos"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/interfaces/types_db"

export function ToDoCard({ id, title, on_stock }: IProduct) {
  const queryClient = useQueryClient()
  const supabase = createClientComponentClient<Database>()

  const {
    mutate: updateTask,
    isPending,
    context,
  } = useMutation({
    mutationFn: async () =>
      await supabase
        .from("products")
        .update({ on_stock: (on_stock += 1) })
        .eq("id", "123"),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["userToDos"] })
      const previousState: IProduct[] | undefined = queryClient.getQueryData(["userToDos"])
      if (previousState) {
        const updatedState = previousState
        updatedState[0].on_stock += 1
        console.log(31, "updatedState - ", updatedState)
        queryClient.setQueryData(["userToDos"], updatedState)
        return { updatedState }
      }
    },
    onSuccess: () => {
      toast({ title: "success", description: "task updated" })
      queryClient.invalidateQueries({ queryKey: ["userToDos"] })
    },
    onError: () => {
      queryClient.setQueryData(["userToDos"], () => context?.updatedState)
      toast({ title: "error", description: "error occured", variant: "destructive" })
    },
    onSettled: () => {
      toast({ title: "onSettled", description: "onSettled description" })

      queryClient.invalidateQueries({ queryKey: ["userToDos"] })
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardFooter>
        <div className="flex justify-between w-full">
          <Button className={isPending ? "text-yellow-400" : ""} onClick={() => updateTask()}>
            Update Status
          </Button>
          <CardDescription>{context?.updatedState[0].on_stock ?? on_stock}</CardDescription>
          <Button>Delete</Button>
        </div>
      </CardFooter>
    </Card>
  )
}
