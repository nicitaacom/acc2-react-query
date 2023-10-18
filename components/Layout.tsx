"use client"

import React, { useEffect, useState } from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  //children in client component is server component by default https://www.youtube.com/watch?v=c8Q_Kp_lDng
  useEffect(() => {
    document.getElementsByTagName("html")[0].classList.remove("light")
    document.getElementsByTagName("html")[0].classList.add("dark")
  })

  //don't use const const queryClient = new QueryClient() - https://tanstack.com/query/latest/docs/react/guides/ssr
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="bg-background text-title
      min-h-screen transition-colors duration-300 pt-[62px]">
        {children}
      </div>
    </QueryClientProvider>
  )
}
