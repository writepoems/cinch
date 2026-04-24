import { useEffect, useState } from "react"
import { Fragment } from "react/jsx-runtime"

import Todo from "@components/Todo"
import Error from "@components/ErrorCard"
import CreateForm from "@components/CreateForm"
import NavigationBar from "@components/NavigationBar"
import SettingsModal from "@components/SettingsModal"

import type { Alert, TodoItem } from "../types"

export default function App() {
  const [alert, setAlert] = useState<Alert|null>()
  const [draft, setDraft] = useState<string>("")
  
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("todos") || "[]")
    } catch (err) {
      console.log(err)
    }
    
    return []
  })

  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    const amount = todos.filter(t => !t.done).length
    document.title = amount > 0 ? `(${amount}) cinch` : "cinch"
  }, [todos])

  return (
    <Fragment>
      <SettingsModal open={settingsOpen} close={() => setSettingsOpen(false)} />
      <NavigationBar onSettingsOpen={() => setSettingsOpen(true)} />

      <main className="p-4 flex justify-center">
        <article className="max-w-1/3">
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
              if (!draft) return void setAlert({ 
                type: "error", message: "Content must not be empty" 
              })
              
              setTodos([{ done: false, label: draft }, ...todos])
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
            {todos.map((todo, index) => (
              <Todo 
                {...todo}
                key={index} 
                onDelete={() => {
                  const toUpdate = todos
                  toUpdate.splice(index, 1)
                  setTodos([...toUpdate])
                }}
                onMarked={() => {
                  const snapshotTodo = todo
                  snapshotTodo.done = !todo.done
  
                  const toUpdate = todos
                  toUpdate.splice(index, 1, snapshotTodo)
                  setTodos([...toUpdate])
                }}
              />
            ))}
          </ul>

          {todos.length === 0 && 
            <p className="text-center opacity-50 mt-2">
              Nothing here yet! Try adding a to-do.
            </p>
          }
        </article>
      </main>
    </Fragment>
  )
}