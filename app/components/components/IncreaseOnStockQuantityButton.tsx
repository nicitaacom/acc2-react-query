"use client"
import { UseMutateFunction, useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "../ui/Button"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { IProduct } from "../Todos"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/interfaces/types_db"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

interface IncreaseOnStockQuantityButtonProps {
  on_stock: number
}

export default function IncreaseOnStockQuantityButton({ on_stock }: IncreaseOnStockQuantityButtonProps) {
  return
}
