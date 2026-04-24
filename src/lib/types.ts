export interface TodoItem {
  done: boolean
  label: string
  id: number
}

export interface Alert {
  type: "success" | "error"
  message: string
}
