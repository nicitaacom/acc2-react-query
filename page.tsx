"use client"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export default function Home() {
  const queryClient = useQueryClient()
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch("https://api.github.com/repos/TanStack/query").then(res => res.json()),
  })
  if (isLoading) return "Loading..."

  if (error) return "An error has occurred: " + error.message
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}