import { 
  AlertTriangle, 
  Circle, 
  CircleCheckBig, 
  Plus, 
  Settings, 
  X 
} from "lucide-react"

import { useEffect, useState } from "react"
import { Fragment } from "react/jsx-runtime"

interface TodoItem {
  done: boolean
  label: string
}

interface AddError {
  message: string
}

export default function App() {
  const [error, setError] = useState<AddError|undefined>()
  const [draft, setDraft] = useState<string>("")
  
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("todos"))
    } catch (err) {
      console.log(err)
      return []
    }
  })

  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    const amount = todos.filter(t => !t.done).length
    document.title = amount > 0 ? `(${amount}) cinch` : "cinch"
  }, [todos])

  return (
    <Fragment>
      <div id="dialog-container" className={settingsOpen ? "" : "hidden"}>
        <dialog open className="z-100 h-2/3 w-1/3 relative border border-neutral-300 bg-neutral-50 shadow-lg rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-display text-4xl">settings</h3>

            <button className="cursor-pointer" onClick={() => setSettingsOpen(false)}>
              <X />
            </button>
          </div>

          <p>Coming soon</p>
        </dialog>
      </div>

      <nav className="z-50 top-0 sticky py-3 px-6 bg-neutral-50 border-neutral-300 border-b flex items-center justify-between">
        <h1 className="font-display font-semibold text-5xl">cinch</h1>

        <div>
          <button className="group p-2 cursor-pointer rounded-xl" onClick={() => {
            setSettingsOpen(true)
          }}>
            <Settings className="group-hover:rotate-180 duration-500" />
          </button>
        </div>
      </nav>

      <main className="p-4 flex justify-center">
        <article className="max-w-1/3">
          {error &&
            <div className="animate-fade-in mb-2 p-3 border-red-700 bg-red-200 text-red-700 border rounded-xl">
              <h3 className="font-bold flex items-center gap-2">
                <AlertTriangle />
                Error
              </h3>

              <p>{error.message}</p>
            </div>
          }

          <form className="flex items-center gap-2" onSubmit={(e) => {
            e.preventDefault()
            if (!draft) return void setError({ message: "Content must not be empty" })
            
            setTodos([{ done: false, label: draft }, ...todos])
            setError(undefined)
            setDraft("")
          }}>
            <input 
              onChange={e => setDraft(e.target.value)}
              value={draft}
              type="text" 
              className="outline-none rounded-xl w-full border border-neutral-300 p-2" 
              placeholder="Wash the dishes..." 
            />

            <button 
              className="flex gap-2 items-center border border-neutral-800 bg-neutral-800 text-neutral-100 btn rounded-xl"
              type="submit"
            >
              <Plus size={18} />
              Add
            </button>
          </form>

          <ul className="space-y-2 my-2">
            {todos.map((todo, index) => (
              <button 
                key={index} 
                className="w-full group flex items-center gap-2 cursor-pointer outline-none"
                onClick={() => {
                  const todoSnapshot = todos[index]
                  todoSnapshot.done = !todo.done

                  const updatedTodos = todos
                  updatedTodos.splice(index, 1, todoSnapshot)
                  setTodos([...updatedTodos])
                }}
              >
                {todo.done 
                  ? <CircleCheckBig 
                      size={18}
                    />
                  : <Circle 
                      size={18} 
                      className="group-hover:text-neutral-600 text-neutral-800 duration-200" 
                    />
                }

                <div className="text-ellipsis">
                  {todo.done ? <s>{todo.label}</s> : <p>{todo.label}</p>}
                </div>
              </button>
            ))}
          </ul>

          {todos.length === 0 && <p className="text-center opacity-50 mt-2">Nothing here yet! Try adding a to-do.</p>}
        </article>
      </main>
    </Fragment>
  )
}