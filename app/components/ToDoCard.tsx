"use client"

import { Button } from "./ui/Button"
import { Card, CardContent, CardTitle, CardDescription, CardHeader, CardFooter } from "./ui/Card"
import type { IProduct } from "./Todos"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/interfaces/types_db"
import { useState } from "react"
import IncreaseOnStockQuantityButton from "./components/IncreaseOnStockQuantityButton"

export function ToDoCard({ id, title, on_stock }: IProduct) {
  //to increase quantity (logic not fully done - its just example)
  const queryClient = useQueryClient()
  const supabase = createClientComponentClient<Database>()

  //create state to make next query based on optimistically updated previous one - https://github.com/TanStack/query/issues/6179
  const [onStock, setOnStock] = useState(on_stock)

  const {
    mutate: increaseOnStockQuantity,
    isPending: increaseOnStockQuantityPending,
    context: increaseOnStockQuantityContext,
  } = useMutation({
    mutationFn: async () => {
      console.log("after updatedState")
      await supabase.from("products").update({ on_stock: onStock }).eq("id", "123")
    },
    onMutate: async () => {
      //as I know it make no sence
      // await queryClient.cancelQueries({ queryKey: ["userToDos"] })
      const previousState: IProduct[] | undefined = queryClient.getQueryData(["userToDos"])
      if (previousState) {
        const updatedState = previousState
        updatedState[0].on_stock += 1

        console.log(31, "updatedState - ", updatedState)
        setOnStock(updatedState[0].on_stock)
        queryClient.setQueryData(["userToDos"], updatedState)
        return { updatedState }
      }
    },
    onSuccess: () => {
      toast({ title: "success", description: "task updated" })
      queryClient.invalidateQueries({ queryKey: ["userToDos"] })
    },
    onError: error => {
      toast({ title: "error", description: error.message, variant: "destructive" })
      setOnStock(increaseOnStockQuantityContext?.updatedState[0].on_stock ?? on_stock)
      queryClient.setQueryData(["userToDos"], () => increaseOnStockQuantityContext?.updatedState)
    },
    onSettled: () => {
      // toast({ title: "onSettled", description: "onSettled description" })
      // queryClient.invalidateQueries({ queryKey: ["userToDos"] })
    },
  })

  //to decrease quantity (logic not fully done - its just example)

  const {
    mutate: decreaseOnStockQuantity,
    isPending: decreaseOnStockQuantityPending,
    context: decreaseOnStockQuantityContext,
  } = useMutation({
    mutationFn: async () => {
      throw Error("something went wrong")
      await supabase.from("products").update({ on_stock: onStock }).eq("id", "123")
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["userToDos"] })
      const previousState: IProduct[] | undefined = queryClient.getQueryData(["userToDos"])
      if (previousState) {
        const updatedState = previousState
        updatedState[0].on_stock -= 1

        console.log(31, "updatedState - ", updatedState)
        setOnStock(updatedState[0].on_stock)
        queryClient.setQueryData(["userToDos"], updatedState)
        return { updatedState }
      }
    },
    onSuccess: () => {
      toast({ title: "success", description: "task updated" })
    },
    onError: error => {
      setOnStock(decreaseOnStockQuantityContext?.updatedState[0].on_stock ?? on_stock)
      queryClient.setQueryData(["userToDos"], () => decreaseOnStockQuantityContext?.updatedState)
      toast({ title: "error", description: error.message, variant: "destructive" })
    },
    onSettled: () => {
      // toast({ title: "onSettled", description: "onSettled description" })
      queryClient.invalidateQueries({ queryKey: ["userToDos"] })
    },
  })
  return (
    <Card className={increaseOnStockQuantityPending || decreaseOnStockQuantityPending ? "animate-pulse" : ""}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-row gap-x-2 w-full">
          <Button className="bg-green-500" onClick={() => increaseOnStockQuantity()}>
            +
          </Button>
          <Button className="bg-red-500" onClick={() => decreaseOnStockQuantity()}>
            -
          </Button>
          <Button variant="outline">Delete</Button>
        </div>
        <CardDescription>{onStock}</CardDescription>
      </CardFooter>
    </Card>
  )
}
