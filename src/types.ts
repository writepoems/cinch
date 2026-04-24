export interface TodoItem {
  done: boolean
  label: string
}

export interface Alert {
  type: "success" | "error"
  message: string
}
