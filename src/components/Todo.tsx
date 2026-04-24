import { Check, Trash2 } from "lucide-react"

function TodoCheck({ done }: { done: boolean }) {
  // hopefully literally nobody notices the color difference
  
  return (
    <div className={done ? "todo-check-done" : "todo-check bg-transparent text-transparent"}>
      <Check size={12} strokeWidth={4} className={done ? "text-neutral-200" : "text-transparent"} />
    </div>
  )
}

export default function Todo({ label, done, onMarked, onDelete }: {
  label: string
  done: boolean
  onMarked: () => void
  onDelete: () => void
}) {
  return (
    <div className="group hover:bg-neutral-200/75 duration-200 p-1.5 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button onClick={onMarked}>
          <TodoCheck done={done} />
        </button>

        {done ? <s>{label}</s> : <p>{label}</p>}
      </div>

      <button className="group-hover:opacity-100 duration-200 opacity-50 cursor-pointer" onClick={onDelete}>
        <Trash2 size={18} className="text-red-400" />
      </button>
    </div>
  )
}