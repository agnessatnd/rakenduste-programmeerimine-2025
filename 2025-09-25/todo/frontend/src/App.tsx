import { useState } from "react"
import "./App.css"
import Todos from "./components/Todos"
import AdminTodos from "./components/AdminTodos"

function App() {
  const [page, setPage] = useState<"todos" | "admin">("todos")

  return (
    <div>
      <nav>
        <button onClick={() => setPage("todos")}>Todos</button>
        <button onClick={() => setPage("admin")}>Admin Todos</button>
      </nav>

      {page === "todos" && <Todos />}
      {page === "admin" && <AdminTodos />}
      <br />
    </div>
  )
}

export default App
