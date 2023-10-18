import Todos from "./components/Todos"
import MakeToDo from "./components/MakeToDo"
export default async function Home() {
  return (
    <h1 className="flex flex-col gap-y-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl max-w-7xl xl:max-w-5xl mx-auto">
      <MakeToDo />
      <Todos />
    </h1>
  )
}
