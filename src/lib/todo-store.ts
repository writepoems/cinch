import type { Dispatch, SetStateAction } from "react"
import type { TodoItem } from "./types"

export class TodoStore {
  private local: Storage
  private todos: TodoItem[]
  private update: Dispatch<SetStateAction<TodoItem[]>>

  constructor(updateCallback: Dispatch<SetStateAction<TodoItem[]>>) {
    this.local = localStorage
    this.todos = this.getTodos()
    this.update = updateCallback

    this.update(this.todos)
    console.log("Initialized todo store")
  }

  private findNextId() {
    // all we're doing here is finding the next id for a new todo
    const todos = this.getTodos()
    const id = Math.max(...todos.map(t => t.id)) + 1
    return id === -Infinity ? 1 : id
  }

  private save() {
    this.local.setItem("todos", JSON.stringify(this.todos))
    this.todos = this.getTodos()
    this.update(this.todos)
  }

  getTodo(id: number) {
    const todos = this.getTodos()
    return todos.find(t => t.id === id) as TodoItem
  }

  getTodos() {
    return JSON.parse(this.local.getItem("todos") ?? "[]") as TodoItem[]
  }

  addTodo(label: string) {
    const id = this.findNextId()
    this.todos.push({ label, done: false, id })
    this.save()
  }

  markTodo(id: number) {
    const todo = this.getTodo(id)
    const pos = this.todos.findIndex(t => t.id === id)
    todo.done = !todo.done

    this.todos.splice(pos, 1, todo)
    this.save()
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id)
    this.save()
  }
}