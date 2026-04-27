import { useEffect, useState } from "react"
import { Fragment } from "react/jsx-runtime"

import Todo from "@components/Todo"
import Error from "@components/ErrorCard"
import CreateForm from "@components/CreateForm"
import NavigationBar from "@components/NavigationBar"
import SettingsModal from "@components/SettingsModal"

import { TodoStore } from "@lib/todo-store"
import type { Alert, TodoItem } from "@lib/types"

import "./app.css"

export default function App() {
  const [alert, setAlert] = useState<Alert|null>()
  const [draft, setDraft] = useState<string>("")
  const [settingsOpen, setSettingsOpen] = useState(false)
  
  const [todos, setTodos] = useState<TodoItem[]>([{ label: "Failed to load", done: false, id: -1 }])
  const store = new TodoStore(setTodos)

  useEffect(() => {
    const amount = todos.filter(t => !t.done).length
    document.title = amount > 0 ? `(${amount}) cinch` : "cinch"
  }, [todos])

  return (
    <Fragment>
      <SettingsModal open={settingsOpen} close={() => setSettingsOpen(false)} />
      <NavigationBar onSettingsOpen={() => setSettingsOpen(true)} />

      <main className="p-4 flex justify-center">
        <article className="xl:w-2/6">
          {alert?.type === "error" &&
            <Error 
              message={alert.message} 
              onDismiss={() => setAlert(null)}
            />
          }

          <CreateForm
            draft={draft}
            onDraftUpdated={(e) => setDraft(e.target.value)}
            onSubmit={(e) => {
              e.preventDefault()
              if (!draft.trim()) return void setAlert({ 
                type: "error", message: "Content must not be empty" 
              })
              
              store.addTodo(draft.trim())
              setAlert(undefined)
              setDraft("")
            }}
          />

          <small className="opacity-75!">
            {
              todos.filter(p => !p.done).length === 0 
              ? "No" 
              : todos.filter(p => !p.done).length
            } tasks to do
          </small>

          <ul className="flex flex-col gap-2 my-2">
            {todos.map(todo => (
              <Todo 
                {...todo}
                key={todo.id} 
                onDelete={() => store.deleteTodo(todo.id)}
                onMarked={() => store.markTodo(todo.id)}
              />
            ))}
          </ul>

          {todos.length === 0 && 
            <p className="text-center opacity-75 mt-2">
              Nothing here yet! Try adding a to-do.
            </p>
          }
        </article>
      </main>
    </Fragment>
  )
}